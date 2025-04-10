import { BaseLLM } from '../../BaseLLM';
import { LLMRequest, Message, MessageRole } from '../../../models/request/LLMRequest';
import { LLMResponse } from '../../../models/response/LLMResponse';
import { VertexAI, GenerativeModel } from '@google-cloud/vertexai';

/**
 * Google Gemini LLM configuration
 */
export interface GoogleLLMConfig {
  /**
   * Google Cloud Project ID (can be provided via GOOGLE_CLOUD_PROJECT env var)
   */
  projectId?: string;
  
  /**
   * Google Cloud location (can be provided via GOOGLE_CLOUD_LOCATION env var)
   */
  location?: string;
  
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
    maxOutputTokens?: number;
  };
}

/**
 * Google Gemini LLM implementation
 */
export class GoogleLLM extends BaseLLM {
  /**
   * Vertex AI instance
   */
  private vertex: VertexAI;
  
  /**
   * Generative model instance
   */
  private generativeModel: GenerativeModel;
  
  /**
   * Default parameters for requests
   */
  private defaultParams: Record<string, any>;
  
  /**
   * Constructor for GoogleLLM
   */
  constructor(model: string, config?: GoogleLLMConfig) {
    super(model);
    
    // Get configuration from environment or passed config
    const projectId = config?.projectId || process.env.GOOGLE_CLOUD_PROJECT;
    const location = config?.location || process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
    
    if (!projectId) {
      throw new Error('Google Cloud Project ID is required. Provide via config or GOOGLE_CLOUD_PROJECT env var.');
    }
    
    // Create Vertex AI instance
    this.vertex = new VertexAI({ project: projectId, location });
    
    // Create generative model instance
    this.generativeModel = this.vertex.getGenerativeModel({ model: this.model });
    
    // Store default parameters
    this.defaultParams = {
      temperature: config?.defaultParams?.temperature ?? 0.7,
      topP: config?.defaultParams?.top_p ?? 1,
      maxOutputTokens: config?.defaultParams?.maxOutputTokens ?? 1024
    };
  }
  
  /**
   * Returns a list of supported models in regex for LLMRegistry
   */
  static supportedModels(): string[] {
    return [
      // Gemini models
      'gemini-.*',
    ];
  }
  
  /**
   * Convert a message to Google Vertex AI format
   */
  private convertMessage(message: Message): any {
    // Base content as empty string, will be populated based on message type
    let content: any = '';
    
    // Handle multimodal content
    if (Array.isArray(message.content)) {
      // Create parts array for multimodal content
      const parts: any[] = [];
      
      for (const part of message.content) {
        if (part.type === 'text') {
          parts.push({ text: part.text });
        } else if (part.type === 'image') {
          parts.push({
            inlineData: {
              mimeType: typeof part.image_url === 'object' && 'mime_type' in part.image_url 
                ? part.image_url.mime_type 
                : 'image/jpeg',
              data: part.image_url.url.startsWith('data:') 
                ? part.image_url.url.split(',')[1] // Handle base64 data URLs
                : Buffer.from(part.image_url.url).toString('base64') // Convert URL to base64
            }
          });
        }
      }
      
      content = parts;
    } else if (typeof message.content === 'string') {
      content = message.content;
    }
    
    // Map to Google format
    const role = this.mapRole(message.role);
    
    return {
      role,
      parts: Array.isArray(content) ? content : [{ text: content }]
    };
  }
  
  /**
   * Map ADK role to Google role
   */
  private mapRole(role: MessageRole): string {
    switch (role) {
      case 'user':
        return 'user';
      case 'assistant':
      case 'function':
      case 'tool':
      case 'model':
        return 'model';
      case 'system':
        return 'system';
      default:
        return 'user';
    }
  }
  
  /**
   * Convert functions to Google function declarations
   */
  private convertFunctionsToTools(functions: any[]): any[] {
    if (!functions || functions.length === 0) {
      return [];
    }
    
    return functions.map(func => ({
      functionDeclarations: [{
        name: func.name,
        description: func.description,
        parameters: func.parameters
      }]
    }));
  }
  
  /**
   * Convert Google response to LLMResponse
   */
  private convertResponse(response: any): LLMResponse {
    // Create base response
    const result = new LLMResponse({
      role: 'assistant',
      content: null
    });
    
    // Extract text content
    if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      result.content = response.candidates[0].content.parts[0].text;
    }
    
    // Handle function calls
    if (response?.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
      const functionCall = response.candidates[0].content.parts[0].functionCall;
      
      result.function_call = {
        name: functionCall.name,
        arguments: JSON.stringify(functionCall.args || {})
      };
      
      // Set tool_calls array too for newer format
      result.tool_calls = [{
        id: `google-${Date.now()}`,
        function: {
          name: functionCall.name,
          arguments: JSON.stringify(functionCall.args || {})
        }
      }];
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
    try {
      // Convert messages to Google format
      const messages = llmRequest.messages.map(msg => this.convertMessage(msg));
      
      // Prepare generation config
      const generationConfig = {
        temperature: llmRequest.config.temperature ?? this.defaultParams.temperature,
        topP: llmRequest.config.top_p ?? this.defaultParams.topP,
        maxOutputTokens: llmRequest.config.max_tokens ?? this.defaultParams.maxOutputTokens
      };
      
      // Prepare tools if specified
      const tools = llmRequest.config.functions 
        ? this.convertFunctionsToTools(llmRequest.config.functions)
        : undefined;
      
      // Prepare chat request
      const requestOptions: any = {
        contents: messages,
        generationConfig
      };
      
      // Add tools if available
      if (tools && tools.length > 0) {
        requestOptions.tools = tools;
      }
      
      if (stream) {
        // Handle streaming
        const streamingResult = await this.generativeModel.generateContentStream(requestOptions);
        
        for await (const chunk of streamingResult.stream) {
          const partialText = chunk.candidates[0]?.content?.parts[0]?.text || '';
          
          // Create partial response
          const partialResponse = new LLMResponse({
            content: partialText,
            role: 'assistant',
            is_partial: true
          });
          
          yield partialResponse;
        }
        
        // Final response handling for function calls which may only be in the final response
        const finalResponse = await streamingResult.response;
        const hasToolCall = finalResponse?.candidates?.[0]?.content?.parts?.[0]?.functionCall;
        
        if (hasToolCall) {
          yield this.convertResponse(finalResponse);
        }
      } else {
        // Non-streaming request
        const response = await this.generativeModel.generateContent(requestOptions);
        yield this.convertResponse(response);
      }
    } catch (error) {
      console.error('Error generating content from Google Gemini:', error);
      throw error;
    }
  }
} 