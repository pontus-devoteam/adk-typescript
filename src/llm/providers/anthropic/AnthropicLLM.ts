import { BaseLLM } from '../../BaseLLM';
import { LLMRequest, Message, MessageRole, MessageContent } from '../../../models/request/LLMRequest';
import { LLMResponse, ToolCall } from '../../../models/response/LLMResponse';
import { BaseLLMConnection } from '../../BaseLLMConnection';
import { AnthropicLLMConnection } from './AnthropicLLMConnection';
import axios, { AxiosInstance } from 'axios';

/**
 * Configuration for Anthropic LLM
 */
export interface AnthropicLLMConfig {
  /**
   * Anthropic API key (can be provided via process.env.ANTHROPIC_API_KEY)
   */
  apiKey?: string;
  
  /**
   * Anthropic base URL override
   */
  baseURL?: string;
  
  /**
   * Default model parameters
   */
  defaultParams?: {
    /**
     * Temperature for generation
     */
    temperature?: number;
    
    /**
     * Top-p for generation
     */
    top_p?: number;
    
    /**
     * Maximum tokens to generate
     */
    max_tokens?: number;
  };
}

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
  // Direct properties for tool_use blocks
  id?: string;
  name?: string;
  input?: any;
}

interface AnthropicTool {
  name: string;
  description: string;
  input_schema: any;
}

interface AnthropicToolUse {
  id: string;
  name: string;
  input: any;
}

interface AnthropicApiResponse {
  id: string;
  type: string;
  role: string;
  model: string;
  content: AnthropicContentBlock[];
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Anthropic LLM implementation for Claude models
 * Uses direct API calls instead of the SDK for better control
 */
export class AnthropicLLM extends BaseLLM {
  /**
   * Anthropic API key
   */
  private apiKey: string;

  /**
   * Anthropic API base URL
   */
  private baseURL: string;
  
  /**
   * Default parameters for requests
   */
  private defaultParams: Record<string, any>;
  
  /**
   * Constructor for AnthropicLLM
   */
  constructor(model: string, config?: AnthropicLLMConfig) {
    super(model);
    
    // Set up API configuration
    this.apiKey = config?.apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.baseURL = config?.baseURL || 'https://api.anthropic.com/v1';
    
    if (!this.apiKey) {
      throw new Error('Anthropic API key is required. Provide it in config or set ANTHROPIC_API_KEY environment variable.');
    }
    
    // Store default parameters
    this.defaultParams = {
      temperature: config?.defaultParams?.temperature ?? 0.7,
      top_p: config?.defaultParams?.top_p ?? 1,
      max_tokens: config?.defaultParams?.max_tokens ?? 1024
    };
  }
  
  /**
   * Returns a list of supported models in regex for LLMRegistry
   */
  static supportedModels(): string[] {
    return [
      // Claude 3 models
      'claude-3-.*',
      // Claude 2 models
      'claude-2.*',
      // Claude Instant models
      'claude-instant.*'
    ];
  }
  
  /**
   * Convert ADK messages to Anthropic message format
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
          // System messages are handled separately in the API
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
          role = 'user';
      }
      
      // Handle message content
      if (typeof message.content === 'string') {
        // Simple text content
        return { role, content: message.content };
      } else if (Array.isArray(message.content)) {
        // Convert multimodal content
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
                media_type: 'image/jpeg',
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
   * Extract the system message from messages array
   */
  private extractSystemMessage(messages: Message[]): string | undefined {
    const systemMessage = messages.find(m => m.role === 'system');
    return systemMessage ? (typeof systemMessage.content === 'string' ? systemMessage.content : JSON.stringify(systemMessage.content)) : undefined;
  }
  
  /**
   * Filter out system messages as they are handled separately
   */
  private filterSystemMessages(messages: Message[]): Message[] {
    return messages.filter(m => m.role !== 'system');
  }
  
  /**
   * Convert ADK function declarations to Anthropic tool format
   */
  private convertFunctionsToTools(functions: any[]): AnthropicTool[] {
    if (!functions?.length) {
      return [];
    }
    
    return functions.map(func => ({
      name: func.name,
      description: func.description || '',
      input_schema: func.parameters
    }));
  }
  
  /**
   * Convert Anthropic tool calls to ADK tool calls
   */
  private convertToolUses(toolUses: AnthropicToolUse[]): ToolCall[] {
    if (!toolUses?.length) {
      return [];
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
        console.log('Processing content block of type:', block.type);
      }
      
      if (block.type === 'tool_use') {
        if (process.env.DEBUG === 'true') {
          console.log('Found tool_use block:', JSON.stringify(block, null, 2));
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
      console.log(`Found ${toolUses.length} tool uses in content`);
      if (toolUses.length > 0) {
        console.log('Extracted tool uses:', JSON.stringify(toolUses, null, 2));
      }
    }
    
    return toolUses;
  }
  
  /**
   * Make a direct API call to Anthropic
   */
  private async callAnthropicAPI(params: any, stream: boolean = false): Promise<any> {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseURL}/messages`,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        data: {
          ...params,
          stream
        },
        responseType: stream ? 'stream' : 'json'
      });
      
      if (process.env.DEBUG === 'true') {
        console.log('Anthropic API Response Status:', response.status);
        if (!stream) {
          console.log('Response Data Structure:', Object.keys(response.data));
          console.log('Response Content Structure:', response.data.content.map((block: any) => ({ type: block.type })));
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Error calling Anthropic API:', error);
      throw error;
    }
  }
  
  /**
   * Generates content from the given request
   */
  async *generateContentAsync(
    llmRequest: LLMRequest,
    stream: boolean = false
  ): AsyncGenerator<LLMResponse, void, unknown> {
    try {
      // Extract system message
      const systemMessage = this.extractSystemMessage(llmRequest.messages);
      
      // Convert messages to Anthropic format, without system message
      const messages = this.convertMessages(
        this.filterSystemMessages(llmRequest.messages)
      );
      
      // Convert tools if provided
      const tools = llmRequest.config.functions 
        ? this.convertFunctionsToTools(llmRequest.config.functions)
        : undefined;
      
      // Prepare request parameters
      const params = {
        model: this.model,
        messages,
        system: systemMessage,
        temperature: llmRequest.config.temperature ?? this.defaultParams.temperature,
        max_tokens: llmRequest.config.max_tokens ?? this.defaultParams.max_tokens,
        top_p: llmRequest.config.top_p ?? this.defaultParams.top_p,
        tools: tools?.length ? tools : undefined
      };
      
      // Only log when DEBUG is explicitly set to 'true'      
      if (process.env.DEBUG === 'true') {
        console.log('Anthropic API Request:', {
          model: params.model,
          messageCount: params.messages.length,
          systemMessage: params.system ? 'present' : 'none',
          tools: params.tools ? params.tools.map(t => t.name) : 'none'
        });
      }
      
      if (stream) {
        // TODO: Implement streaming if needed
        throw new Error('Streaming is not supported in this implementation');
      } else {
        // Make direct API call
        const response = await this.callAnthropicAPI(params);
        
        if (process.env.DEBUG === 'true') {
          console.log('Full Response Content:', JSON.stringify(response.content, null, 2));
        }
        
        // Extract text content
        let content = '';
        for (const block of response.content) {
          if (block.type === 'text') {
            content += block.text;
          }
        }
        
        // Extract tool uses
        const toolUses = this.extractToolUses(response.content);
        const toolCalls = this.convertToolUses(toolUses);

        if (process.env.DEBUG === 'true') {
          if (toolUses.length > 0) {
            console.log('Extracted Tool Uses:', JSON.stringify(toolUses, null, 2));
            console.log('Converted Tool Calls:', JSON.stringify(toolCalls, null, 2));
          }
        }
        
        // Only yield a response with tool_calls if there are any
        const llmResponse = new LLMResponse({
          role: 'assistant',
          content,
          tool_calls: toolCalls.length > 0 ? toolCalls : undefined,
          raw_response: response
        });
        
        if (process.env.DEBUG === 'true') {
          console.log('Final LLMResponse object:', JSON.stringify({
            role: llmResponse.role,
            content: llmResponse.content?.substring(0, 50) + (llmResponse.content && llmResponse.content.length > 50 ? '...' : ''),
            tool_calls: llmResponse.tool_calls ? `[${llmResponse.tool_calls.length} calls]` : 'undefined'
          }, null, 2));
        }
        
        yield llmResponse;
      }
    } catch (error) {
      if (process.env.DEBUG === 'true') {
        console.error('Error calling Anthropic:', error);
      }
      throw error;
    }
  }
  
  /**
   * Creates a live connection to the LLM
   */
  connect(llmRequest: LLMRequest): BaseLLMConnection {
    const axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      }
    });
    return new AnthropicLLMConnection(axiosInstance, this.model, llmRequest, this.defaultParams);
  }
} 