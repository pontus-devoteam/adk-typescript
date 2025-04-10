import { BaseLLM } from '../../BaseLLM';
import { LLMRequest, Message, MessageRole, MessageContent } from '../../../models/request/LLMRequest';
import { LLMResponse, ToolCall } from '../../../models/response/LLMResponse';
import { BaseLLMConnection } from '../../BaseLLMConnection';
import { AnthropicLLMConnection } from './AnthropicLLMConnection';
import Anthropic from '@anthropic-ai/sdk';

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

// Anthropic content block interface
interface ContentBlock {
  type: string;
  text?: string;
  source?: {
    type: string;
    url: string;
  };
}

// Anthropic message interface
interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: ContentBlock[];
}

// Anthropic tool interface
interface AnthropicTool {
  name: string;
  description: string;
  input_schema: any;
}

// Anthropic tool use block interface
interface ToolUseBlock {
  id: string;
  name: string;
  input: any;
}

// Stream delta interface
interface ContentBlockDelta {
  type: string;
  text: string;
}

interface StreamChunk {
  type: string;
  delta?: {
    type: string;
    text: string;
  };
  id?: string;
  name?: string;
  input?: any;
}

// Anthropic message create params interface
interface MessageCreateParams {
  model: string;
  messages: AnthropicMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  system?: string;
  tools?: AnthropicTool[];
  stream?: boolean;
}

// Anthropic API response interface
interface AnthropicResponse {
  content: ContentBlock[];
  tool_uses?: ToolUseBlock[];
}

/**
 * Anthropic LLM implementation for Claude models
 */
export class AnthropicLLM extends BaseLLM {
  /**
   * Anthropic client instance
   */
  private client: Anthropic;
  
  /**
   * Default parameters for requests
   */
  private defaultParams: Record<string, any>;
  
  /**
   * Constructor for AnthropicLLM
   */
  constructor(model: string, config?: AnthropicLLMConfig) {
    super(model);
    
    // Create the Anthropic client
    this.client = new Anthropic({
      apiKey: config?.apiKey || process.env.ANTHROPIC_API_KEY,
      baseURL: config?.baseURL
    });
    
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
   * Converts an ADK message to an Anthropic message
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
   * Convert tools to Anthropic tool format
   */
  private convertTools(functions: any[]): AnthropicTool[] {
    if (!functions || functions.length === 0) {
      return [];
    }
    
    return functions.map(func => ({
      name: func.name,
      description: func.description,
      input_schema: func.parameters
    }));
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
   * Extract the system message from messages array
   */
  private extractSystemMessage(messages: Message[]): string | undefined {
    const systemMessage = messages.find(m => m.role === 'system');
    return systemMessage ? (typeof systemMessage.content === 'string' ? systemMessage.content : '') : undefined;
  }
  
  /**
   * Filter out system messages as they are handled separately
   */
  private filterSystemMessages(messages: Message[]): Message[] {
    return messages.filter(m => m.role !== 'system');
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
      
      // Prepare messages without system message
      const messages = this.filterSystemMessages(llmRequest.messages)
        .map(msg => this.convertMessage(msg));
      
      // Convert tools if provided
      const tools = llmRequest.config.functions 
        ? this.convertTools(llmRequest.config.functions)
        : undefined;
      
      // Prepare request parameters
      const params: MessageCreateParams = {
        model: this.model,
        messages,
        temperature: llmRequest.config.temperature ?? this.defaultParams.temperature,
        max_tokens: llmRequest.config.max_tokens ?? this.defaultParams.max_tokens,
        top_p: llmRequest.config.top_p ?? this.defaultParams.top_p,
      };
      
      // Add system if available
      if (systemMessage) {
        params.system = systemMessage;
      }
      
      // Add tools if available
      if (tools && tools.length > 0) {
        params.tools = tools;
      }
      
      if (stream) {
        // Handle streaming
        const streamOptions = { ...params, stream: true };
        // @ts-expect-error - Types for streaming may vary across SDK versions
        const stream = await this.client.messages.create(streamOptions);
        
        let content = '';
        let partialToolCalls: Map<string, ToolCall> | undefined;
        
        for await (const chunk of stream) {
          const streamChunk = chunk as unknown as StreamChunk;
          
          if (streamChunk.type === 'content_block_delta' && streamChunk.delta?.type === 'text') {
            content += streamChunk.delta.text;
            
            yield new LLMResponse({
              role: 'assistant',
              content,
              is_partial: true
            });
          } else if (streamChunk.type === 'tool_use') {
            // Handle tool use in streaming mode
            if (!partialToolCalls) {
              partialToolCalls = new Map();
            }
            
            const toolCall: ToolCall = {
              id: streamChunk.id || '',
              function: {
                name: streamChunk.name || '',
                arguments: JSON.stringify(streamChunk.input || {})
              }
            };
            
            partialToolCalls.set(toolCall.id, toolCall);
            
            yield new LLMResponse({
              role: 'assistant',
              content,
              tool_calls: Array.from(partialToolCalls.values()),
              is_partial: true
            });
          }
        }
      } else {
        // Handle non-streaming
        // @ts-expect-error - Types may vary across SDK versions
        const response = await this.client.messages.create(params) as unknown as AnthropicResponse;
        
        let content: string | null = null;
        
        // Extract content from response
        for (const block of response.content) {
          if (block.type === 'text') {
            content = block.text || null;
            break;
          }
        }
        
        // Convert tool calls if present
        const toolCalls = this.convertToolCalls(response.tool_uses);
        
        yield new LLMResponse({
          role: 'assistant',
          content,
          tool_calls: toolCalls
        });
      }
    } catch (error) {
      console.error('Error calling Anthropic:', error);
      throw error;
    }
  }
  
  /**
   * Creates a live connection to the LLM
   */
  connect(llmRequest: LLMRequest): BaseLLMConnection {
    return new AnthropicLLMConnection(this.client, this.model, llmRequest, this.defaultParams);
  }
} 