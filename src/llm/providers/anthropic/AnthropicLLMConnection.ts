import { BaseLLMConnection } from '../../BaseLLMConnection';
import { LLMRequest, Message } from '../../../models/request/LLMRequest';
import { LLMResponse, ToolCall } from '../../../models/response/LLMResponse';
import axios, { AxiosInstance } from 'axios';

// Helper types for the Anthropic API
interface AnthropicApiMessage {
  role: 'user' | 'assistant';
  content: string | AnthropicContentBlock[];
}

type AnthropicContentBlockType = 'text' | 'image' | 'tool_use' | 'tool_result';

interface AnthropicContentBlock {
  type: AnthropicContentBlockType;
  text?: string;
  source?: {
    type: 'base64' | 'url';
    media_type: string;
    data?: string;
    url?: string;
  };
  tool_use?: AnthropicToolUse;
  tool_result?: {
    content: string;
    tool_use_id: string;
  };
  // Direct properties for tool_use blocks in the API response
  id?: string;
  name?: string;
  input?: any;
}

interface AnthropicToolUse {
  id: string;
  name: string;
  input: any;
}

/**
 * Anthropic LLM Connection for live chat with Claude models
 */
export class AnthropicLLMConnection extends BaseLLMConnection {
  /**
   * Axios instance for API calls
   */
  private client: AxiosInstance;

  /**
   * Current model to use
   */
  private model: string;

  /**
   * Current messages in the conversation
   */
  private messages: AnthropicApiMessage[];
  
  /**
   * System message if present
   */
  private systemMessage?: string;

  /**
   * Default parameters for requests
   */
  private defaultParams: Record<string, any>;

  /**
   * Callbacks for handling responses, errors, and connection end
   */
  private responseCallback?: (response: LLMResponse) => void;
  private errorCallback?: (error: Error) => void;
  private endCallback?: () => void;

  /**
   * Constructor
   */
  constructor(
    client: AxiosInstance,
    model: string,
    initialRequest: LLMRequest,
    defaultParams: Record<string, any>
  ) {
    super();

    this.client = client;
    this.model = model;
    this.defaultParams = defaultParams;
    
    // Extract system message
    this.systemMessage = this.extractSystemMessage(initialRequest.messages);

    // Initialize messages without system message
    this.messages = this.convertMessages(
      this.filterSystemMessages(initialRequest.messages)
    );
  }

  /**
   * Extract the system message from messages array
   */
  private extractSystemMessage(messages: Message[]): string | undefined {
    const systemMessage = messages.find(m => m.role === 'system');
    return systemMessage ? (typeof systemMessage.content === 'string' ? systemMessage.content : JSON.stringify(systemMessage.content)) : undefined;
  }
  
  /**
   * Filter out system messages as they are handled separately in Anthropic API
   */
  private filterSystemMessages(messages: Message[]): Message[] {
    return messages.filter(m => m.role !== 'system');
  }

  /**
   * Converts an ADK message to an Anthropic message
   */
  private convertMessages(messages: Message[]): AnthropicApiMessage[] {
    return messages.map(message => {
      let role: 'user' | 'assistant';
      
      switch (message.role) {
        case 'user':
          role = 'user';
          break;
        
        case 'assistant':
          role = 'assistant';
          break;
        
        case 'system':
          // System messages are handled separately in Anthropic API
          throw new Error('System messages should be handled separately');
          
        case 'function':
        case 'tool':
          // Convert function/tool responses to user messages
          return {
            role: 'user',
            content: `Function/Tool response: ${message.name || 'unknown'}\n${
              typeof message.content === 'string' 
                ? message.content 
                : JSON.stringify(message.content)
            }`
          };
        
        default:
          // Default to user for any unknown types
          role = 'user';
      }
      
      // Handle content based on type
      if (typeof message.content === 'string') {
        // Simple text content
        return { role, content: message.content };
      } else if (Array.isArray(message.content)) {
        // Convert multimodal content to Anthropic format
        const content: AnthropicContentBlock[] = message.content.map(item => {
          if (item.type === 'text') {
            return {
              type: 'text' as const,
              text: item.text
            };
          } else if (item.type === 'image') {
            return {
              type: 'image' as const,
              source: {
                type: 'url',
                media_type: 'image/jpeg', // Default to JPEG
                url: item.image_url.url
              }
            };
          }
          throw new Error(`Unsupported content type: ${(item as any).type}`);
        });
        
        return { role, content };
      } else {
        // Default to string for complex objects
        return { role, content: JSON.stringify(message.content) };
      }
    });
  }

  /**
   * Convert Anthropic tool calls to ADK tool calls
   */
  private convertToolCalls(toolUses?: AnthropicToolUse[]): ToolCall[] | undefined {
    if (!toolUses?.length) {
      return undefined;
    }
    
    return toolUses.map(toolUse => ({
      id: toolUse.id,
      function: {
        name: toolUse.name,
        arguments: JSON.stringify(toolUse.input)
      }
    }));
  }
  
  /**
   * Extract tool uses from response content
   */
  private extractToolUses(content: AnthropicContentBlock[]): AnthropicToolUse[] {
    if (!content?.length) return [];
    
    const toolUses: AnthropicToolUse[] = [];
    
    for (const block of content) {
      if (process.env.DEBUG === 'true') {
        console.log('Connection - Processing content block of type:', block.type);
      }
      
      if (block.type === 'tool_use') {
        if (process.env.DEBUG === 'true') {
          console.log('Connection - Found tool_use block:', JSON.stringify(block, null, 2));
        }
        
        // Extract tool use directly from the block
        toolUses.push({
          id: block.id || 'unknown-id',
          name: block.name || 'unknown-name',
          input: block.input || {}
        });
      }
    }
    
    if (process.env.DEBUG === 'true') {
      console.log(`Connection - Found ${toolUses.length} tool uses in content`);
      if (toolUses.length > 0) {
        console.log('Connection - Extracted tool uses:', JSON.stringify(toolUses, null, 2));
      }
    }
    
    return toolUses;
  }

  /**
   * Sends a message to the LLM
   * Implements BaseLLMConnection.send
   * 
   * @param message The message to send
   */
  public send(message: string): void {
    if (!this.isActive) {
      this.triggerError(new Error('Connection is not active'));
      return;
    }

    // Create a user message
    const userMessage: AnthropicApiMessage = {
      role: 'user',
      content: message
    };

    // Add to messages array
    this.messages.push(userMessage);

    // Send the message asynchronously
    this.sendMessageAsync()
      .then(response => {
        if (this.responseCallback) {
          this.responseCallback(response);
        }
        
        // Add the assistant's response to the messages array
        if (response.content) {
          this.messages.push({
            role: 'assistant',
            content: response.content
          });
        }
        
        // Trigger end callback after response
        if (this.endCallback) {
          this.endCallback();
        }
      })
      .catch(error => {
        this.triggerError(error);
      });
  }

  /**
   * Handles responses from the LLM
   * Implements BaseLLMConnection.onResponse
   * 
   * @param callback The callback to handle responses
   */
  public onResponse(callback: (response: LLMResponse) => void): void {
    this.responseCallback = callback;
  }

  /**
   * Handles errors from the LLM
   * Implements BaseLLMConnection.onError
   * 
   * @param callback The callback to handle errors
   */
  public onError(callback: (error: Error) => void): void {
    this.errorCallback = callback;
  }

  /**
   * Handles the end of the connection
   * Implements BaseLLMConnection.onEnd
   * 
   * @param callback The callback to handle the end
   */
  public onEnd(callback: () => void): void {
    this.endCallback = callback;
  }

  /**
   * Triggers an error through the error callback
   */
  private triggerError(error: Error): void {
    if (this.errorCallback) {
      this.errorCallback(error);
    }
  }

  /**
   * Sends the message to the LLM and returns the response
   */
  private async sendMessageAsync(): Promise<LLMResponse> {
    try {
      const response = await this.client.post('/messages', {
        model: this.model,
        messages: this.messages,
        system: this.systemMessage,
        max_tokens: this.defaultParams.max_tokens,
        temperature: this.defaultParams.temperature,
        top_p: this.defaultParams.top_p
      });

      const apiResponse = response.data;
      
      // Extract text content from response
      let content = '';
      for (const block of apiResponse.content) {
        if (block.type === 'text') {
          content += block.text;
        }
      }
      
      // Extract tool uses from response content
      const toolUses = this.extractToolUses(apiResponse.content);
      const toolCalls = this.convertToolCalls(toolUses);

      if (process.env.DEBUG === 'true') {
        if (toolUses.length > 0) {
          console.log('Connection - Extracted Tool Uses:', JSON.stringify(toolUses, null, 2));
          console.log('Connection - Converted Tool Calls:', JSON.stringify(toolCalls, null, 2));
        }
      }
      
      // Create LLM Response
      const llmResponse = new LLMResponse({
        role: 'assistant',
        content,
        tool_calls: toolCalls?.length ? toolCalls : undefined,
        raw_response: apiResponse
      });
      
      if (process.env.DEBUG === 'true') {
        console.log('Connection - Final LLMResponse object:', JSON.stringify({
          role: llmResponse.role,
          content: llmResponse.content?.substring(0, 50) + (llmResponse.content && llmResponse.content.length > 50 ? '...' : ''),
          tool_calls: llmResponse.tool_calls ? `[${llmResponse.tool_calls.length} calls]` : 'undefined'
        }, null, 2));
      }

      return llmResponse;
    } catch (error) {
      if (process.env.DEBUG === 'true') {
        console.error('Error sending message to Anthropic:', error);
      }
      throw error;
    }
  }
} 