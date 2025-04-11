import { BaseLLM } from '../../BaseLLM';
import { LLMRequest, Message } from '../../../models/request/LLMRequest';
import { LLMResponse, FunctionCall, ToolCall } from '../../../models/response/LLMResponse';
import { BaseLLMConnection } from '../../BaseLLMConnection';
import { OpenAILLMConnection } from './OpenAILLMConnection';
import OpenAI from 'openai';

/**
 * Configuration for OpenAI LLM
 */
export interface OpenAILLMConfig {
  /**
   * OpenAI API key (can be provided via process.env.OPENAI_API_KEY)
   */
  apiKey?: string;
  
  /**
   * OpenAI base URL override
   */
  baseURL?: string;
  
  /**
   * OpenAI organization ID
   */
  organization?: string;
  
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
    
    /**
     * Frequency penalty
     */
    frequency_penalty?: number;
    
    /**
     * Presence penalty
     */
    presence_penalty?: number;
  };
}

/**
 * OpenAI LLM implementation
 */
export class OpenAILLM extends BaseLLM {
  /**
   * OpenAI client instance
   */
  private client: OpenAI;
  
  /**
   * Default parameters for requests
   */
  private defaultParams: Record<string, any>;
  
  /**
   * Constructor for OpenAILLM
   */
  constructor(model: string, config?: OpenAILLMConfig) {
    super(model);
    
    // Create the OpenAI client
    this.client = new OpenAI({
      apiKey: config?.apiKey || process.env.OPENAI_API_KEY,
      baseURL: config?.baseURL,
      organization: config?.organization
    });
    
    // Store default parameters
    this.defaultParams = {
      temperature: config?.defaultParams?.temperature ?? 0.7,
      top_p: config?.defaultParams?.top_p ?? 1,
      max_tokens: config?.defaultParams?.max_tokens,
      frequency_penalty: config?.defaultParams?.frequency_penalty ?? 0,
      presence_penalty: config?.defaultParams?.presence_penalty ?? 0
    };
  }
  
  /**
   * Returns a list of supported models in regex for LLMRegistry
   */
  static supportedModels(): string[] {
    return [
      // GPT-4 models
      'gpt-4-.*',
      // GPT-3.5 models
      'gpt-3.5-.*',
      // Future-proofing
      'text-davinci-.*'
    ];
  }
  
  /**
   * Converts an ADK message to an OpenAI message
   */
  private convertMessage(message: Message): OpenAI.Chat.ChatCompletionMessageParam {
    // Extract base content as string
    const baseContent = typeof message.content === 'string' ? message.content : '';
    let baseMessage: OpenAI.Chat.ChatCompletionMessageParam;
    
    switch (message.role) {
      case 'user':
        baseMessage = {
          role: 'user',
          content: baseContent
        };
        break;
      
      case 'assistant':
        baseMessage = {
          role: 'assistant',
          content: baseContent
        };
        
        // Add tool calls if present
        if (message.tool_calls && message.tool_calls.length > 0) {
          (baseMessage as any).tool_calls = message.tool_calls.map(tc => ({
            id: tc.id,
            type: 'function',
            function: {
              name: tc.function.name,
              arguments: tc.function.arguments
            }
          }));
        }
        break;
      
      case 'system':
        baseMessage = {
          role: 'system',
          content: baseContent
        };
        break;
      
      case 'tool':
        // Tool messages require a tool_call_id
        if (!message.tool_call_id) {
          throw new Error('Tool messages must have a tool_call_id');
        }
        baseMessage = {
          role: 'tool',
          content: baseContent,
          tool_call_id: message.tool_call_id
        };
        break;
      
      default:
        // Default to user message for any unknown types
        baseMessage = {
          role: 'user',
          content: baseContent
        };
    }
    
    // Handle multimodal content for user and system messages
    if ((message.role === 'user' || message.role === 'system') && Array.isArray(message.content)) {
      const parts: Array<OpenAI.Chat.ChatCompletionContentPart> = [];
      
      for (const part of message.content) {
        if (part.type === 'text') {
          parts.push({ type: 'text', text: part.text });
        } else if (part.type === 'image') {
          parts.push({
            type: 'image_url',
            image_url: { url: part.image_url.url }
          });
        }
      }
      
      if (parts.length > 0) {
        baseMessage.content = parts;
      }
    }
    
    return baseMessage;
  }
  
  /**
   * Converts functions to OpenAI tools
   */
  private convertFunctionsToTools(functions: any[]): OpenAI.Chat.ChatCompletionTool[] {
    if (!functions || functions.length === 0) {
      return [];
    }
    
    return functions.map(func => ({
      type: 'function',
      function: {
        name: func.name,
        description: func.description,
        parameters: func.parameters
      }
    }));
  }
  
  /**
   * Convert OpenAI response to LLMResponse
   */
  private convertResponse(response: OpenAI.Chat.ChatCompletion.Choice): LLMResponse {
    const result = new LLMResponse({
      content: response.message?.content || null,
      role: response.message?.role || 'assistant'
    });
    
    // Handle function calls
    if (response.message?.function_call) {
      result.function_call = {
        name: response.message.function_call.name,
        arguments: response.message.function_call.arguments
      };
    }
    
    // Handle tool calls
    if (response.message?.tool_calls) {
      result.tool_calls = response.message.tool_calls.map(tool => ({
        id: tool.id,
        function: {
          name: tool.function.name,
          arguments: tool.function.arguments
        }
      }));
    }
    
    return result;
  }
  
  /**
   * Convert OpenAI streaming chunk to LLMResponse
   */
  private convertChunk(chunk: OpenAI.Chat.ChatCompletionChunk.Choice): LLMResponse {
    const result = new LLMResponse({
      content: chunk.delta?.content || null,
      role: chunk.delta?.role || 'assistant',
      is_partial: true
    });
    
    // Handle function calls
    if (chunk.delta?.function_call) {
      result.function_call = {
        name: chunk.delta.function_call.name || '',
        arguments: chunk.delta.function_call.arguments || ''
      };
    }
    
    // Handle tool calls
    if (chunk.delta?.tool_calls) {
      result.tool_calls = chunk.delta.tool_calls.map(tool => ({
        id: tool.id || '',
        function: {
          name: tool.function?.name || '',
          arguments: tool.function?.arguments || ''
        }
      }));
    }
    
    return result;
  }
  
  /**
   * Generates content from the given request
   */
  async *generateContentAsync(
    llmRequest: LLMRequest,
    stream: boolean = false
  ): AsyncGenerator<LLMResponse, void, unknown> {
    // Prepare messages
    const messages = llmRequest.messages.map(msg => this.convertMessage(msg));
    
    // Prepare tools if specified
    const tools = llmRequest.config.functions 
      ? this.convertFunctionsToTools(llmRequest.config.functions)
      : undefined;
    
    // Prepare request parameters
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      model: this.model,
      messages,
      temperature: llmRequest.config.temperature ?? this.defaultParams.temperature,
      max_tokens: llmRequest.config.max_tokens ?? this.defaultParams.max_tokens,
      top_p: llmRequest.config.top_p ?? this.defaultParams.top_p,
      frequency_penalty: llmRequest.config.frequency_penalty ?? this.defaultParams.frequency_penalty,
      presence_penalty: llmRequest.config.presence_penalty ?? this.defaultParams.presence_penalty,
      stream,
    };
    
    // Add tools if available
    if (tools && tools.length > 0) {
      params.tools = tools;
    }
    
    try {
      if (stream) {
        // Handle streaming - explicitly cast the stream to the correct type
        const streamResponse = await this.client.chat.completions.create(params);
        
        // Track partial function/tool calls
        let partialFunctionCall: FunctionCall | undefined;
        const partialToolCalls: Map<string, ToolCall> = new Map();
        
        // Ensure the response is a proper async iterable for await...of
        const asyncIterable = streamResponse as AsyncIterable<any>;
        
        for await (const chunk of asyncIterable) {
          if (!chunk.choices || chunk.choices.length === 0) continue;
          
          const choice = chunk.choices[0];
          const responseChunk = this.convertChunk(choice);
          
          // Track partial function call
          if (responseChunk.function_call) {
            if (!partialFunctionCall) {
              partialFunctionCall = {
                name: responseChunk.function_call.name,
                arguments: responseChunk.function_call.arguments
              };
            } else {
              partialFunctionCall.name += responseChunk.function_call.name || '';
              partialFunctionCall.arguments += responseChunk.function_call.arguments || '';
            }
            
            responseChunk.function_call = partialFunctionCall;
          }
          
          // Track partial tool calls
          if (responseChunk.tool_calls && responseChunk.tool_calls.length > 0) {
            for (const toolCall of responseChunk.tool_calls) {
              const existingTool = partialToolCalls.get(toolCall.id);
              
              if (!existingTool) {
                partialToolCalls.set(toolCall.id, toolCall);
              } else {
                existingTool.function.name += toolCall.function.name;
                existingTool.function.arguments += toolCall.function.arguments;
              }
            }
            
            responseChunk.tool_calls = Array.from(partialToolCalls.values());
          }
          
          yield responseChunk;
        }
      } else {
        // Handle non-streaming
        const response = await this.client.chat.completions.create(params);
        
        // @ts-expect-error - OpenAI SDK types may be inconsistent
        if (!response.choices || response.choices.length === 0) {
          throw new Error('No response from OpenAI');
        }
        
        // @ts-expect-error - OpenAI SDK types may be inconsistent
        yield this.convertResponse(response.choices[0]);
      }
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }
  
  /**
   * Creates a live connection to the LLM
   */
  connect(llmRequest: LLMRequest): BaseLLMConnection {
    return new OpenAILLMConnection(this.client, this.model, llmRequest, this.defaultParams);
  }
} 