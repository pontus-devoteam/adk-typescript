import { BaseLLMConnection } from '../../BaseLLMConnection';
import { LLMRequest, Message } from '../../../models/request/LLMRequest';
import { LLMResponse, ToolCall } from '../../../models/response/LLMResponse';
import Anthropic from '@anthropic-ai/sdk';

// Basic types for Anthropic API
interface ContentBlock {
  type: string;
  text?: string;
}

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: ContentBlock[];
}

interface ToolUseBlock {
  id: string;
  name: string;
  input: any;
}

interface MessageResponse {
  content: ContentBlock[];
  tool_uses?: ToolUseBlock[];
}

/**
 * Anthropic LLM Connection for live chat with Claude models
 */
export class AnthropicLLMConnection extends BaseLLMConnection {
  /**
   * Anthropic client instance
   */
  private client: Anthropic;

  /**
   * Current model to use
   */
  private model: string;

  /**
   * Current messages in the conversation
   */
  private messages: AnthropicMessage[];

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
    client: Anthropic,
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

    // Initialize messages, filtering out system message
    this.messages = this.filterSystemMessages(initialRequest.messages)
      .map(msg => this.convertMessage(msg));
  }

  /**
   * Extract system message
   */
  private extractSystemMessage(messages: Message[]): string | undefined {
    const systemMessage = messages.find(m => m.role === 'system');
    return systemMessage ? (typeof systemMessage.content === 'string' ? systemMessage.content : '') : undefined;
  }

  /**
   * Filter out system messages
   */
  private filterSystemMessages(messages: Message[]): Message[] {
    return messages.filter(m => m.role !== 'system');
  }

  /**
   * Convert ADK message to Anthropic message
   */
  private convertMessage(message: Message): AnthropicMessage {
    // Convert content based on type
    let content: ContentBlock[] = [];

    if (typeof message.content === 'string') {
      // Handle string content
      content = [{ type: 'text', text: message.content }];
    } else if (Array.isArray(message.content)) {
      // Handle multimodal content
      content = message.content.map(part => {
        if (part.type === 'text') {
          return { type: 'text', text: part.text };
        } else if (part.type === 'image') {
          return {
            type: 'image',
            source: {
              type: 'url',
              url: part.image_url.url
            }
          } as ContentBlock;
        }
        throw new Error(`Unsupported content type: ${(part as any).type}`);
      });
    }

    // Create message with proper role
    let role: 'user' | 'assistant';
    
    switch (message.role) {
      case 'user':
        role = 'user';
        break;
      
      case 'assistant':
        role = 'assistant';
        break;
      
      case 'system':
        // System messages are not supported in MessageParam but handled separately
        throw new Error('System messages should be handled separately');
        
      case 'function':
      case 'tool':
        // Convert function/tool responses to user messages with specific format
        role = 'user';
        content = [{ 
          type: 'text', 
          text: `Function/Tool response: ${message.name || 'unknown'}\n${typeof message.content === 'string' ? message.content : JSON.stringify(message.content)}` 
        }];
        break;
      
      default:
        // Default to user for any unknown types
        role = 'user';
    }
    
    // Return properly formatted message
    return { role, content };
  }

  /**
   * Convert Anthropic tool calls to ADK tool calls
   */
  private convertToolCalls(toolCalls?: ToolUseBlock[]): ToolCall[] | undefined {
    if (!toolCalls || toolCalls.length === 0) {
      return undefined;
    }
    
    return toolCalls.map(toolCall => ({
      id: toolCall.id,
      function: {
        name: toolCall.name,
        arguments: JSON.stringify(toolCall.input)
      }
    }));
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
    const userMessage: Message = {
      role: 'user',
      content: message
    };

    // Send the message asynchronously
    this.sendMessageAsync(userMessage)
      .then(response => {
        if (this.responseCallback) {
          this.responseCallback(response);
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
    
    // Trigger end callback after error
    if (this.endCallback) {
      this.endCallback();
    }
  }

  /**
   * Send a message and get a response asynchronously
   */
  private async sendMessageAsync(message: Message): Promise<LLMResponse> {
    try {
      // Convert the new message
      const anthropicMessage = this.convertMessage(message);
      
      // Add to messages array
      this.messages.push(anthropicMessage);
      
      // Prepare request parameters
      const params = {
        model: this.model,
        messages: this.messages,
        temperature: this.defaultParams.temperature,
        max_tokens: this.defaultParams.max_tokens,
        top_p: this.defaultParams.top_p,
      };
      
      // Add system message if available
      if (this.systemMessage) {
        // @ts-expect-error - Types may vary across SDK versions
        params.system = this.systemMessage;
      }
      
      // Send request to Anthropic
      // @ts-expect-error - Types may vary across SDK versions
      const response = await this.client.messages.create(params) as unknown as MessageResponse;
      
      // Extract content text
      let content: string | null = null;
      for (const block of response.content) {
        if (block.type === 'text') {
          content = block.text || null;
          break;
        }
      }
      
      // Create response object
      const llmResponse = new LLMResponse({
        role: 'assistant',
        content,
        tool_calls: this.convertToolCalls(response.tool_uses)
      });
      
      // Add the assistant's response to the messages array
      this.messages.push({
        role: 'assistant',
        content: response.content
      });
      
      return llmResponse;
    } catch (error) {
      console.error('Error sending message to Anthropic:', error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
} 