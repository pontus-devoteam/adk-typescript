import { FunctionDeclaration } from './FunctionDeclaration';
import { ToolCall } from '../response/LLMResponse';

/**
 * Message role types for conversation history
 */
export type MessageRole = 'user' | 'assistant' | 'system' | 'function' | 'tool' | 'model';

/**
 * Text content type
 */
export interface TextContent {
  type: 'text';
  text: string;
}

/**
 * Image content type
 */
export interface ImageContent {
  type: 'image';
  image_url: {
    url: string;
  };
}

/**
 * Message content types
 */
export type MessageContent = string | TextContent | ImageContent | Array<TextContent | ImageContent>;

/**
 * Represents a message in the conversation
 */
export interface Message {
  role: MessageRole;
  content: MessageContent;
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  };
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

/**
 * Configuration for LLM requests
 */
export interface LLMRequestConfig {
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  functions?: FunctionDeclaration[];
}

/**
 * Represents a request to an LLM
 */
export class LLMRequest {
  /** 
   * The conversation history
   */
  messages: Message[];
  
  /**
   * LLM configuration parameters
   */
  config: LLMRequestConfig;

  constructor(data: {
    messages: Message[];
    config?: LLMRequestConfig;
  }) {
    this.messages = data.messages;
    this.config = data.config || {};
  }
} 