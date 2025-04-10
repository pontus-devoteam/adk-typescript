import { MessageContent } from '../request/LLMRequest';

/**
 * Function call result from LLM
 */
export interface FunctionCall {
  /**
   * Name of the function to call
   */
  name: string;
  
  /**
   * Arguments for the function, serialized as a JSON string
   */
  arguments: string;
}

/**
 * Tool call result from LLM
 */
export interface ToolCall {
  /**
   * Unique ID for the tool call
   */
  id: string;
  
  /**
   * Function call details
   */
  function: FunctionCall;
}

/**
 * Response from an LLM
 */
export class LLMResponse {
  /**
   * Content of the response
   */
  content?: string | null;
  
  /**
   * Function calls in the response
   */
  function_call?: FunctionCall;
  
  /**
   * Tool calls in the response
   */
  tool_calls?: ToolCall[];
  
  /**
   * Role of the message (usually 'assistant')
   */
  role: string;
  
  /**
   * Whether this is a partial response in a stream
   */
  is_partial?: boolean;
  
  /**
   * Raw provider response
   */
  raw_response?: any;

  constructor(data: {
    content?: string | null;
    function_call?: FunctionCall;
    tool_calls?: ToolCall[];
    role?: string;
    is_partial?: boolean;
    raw_response?: any;
  }) {
    this.content = data.content;
    this.function_call = data.function_call;
    this.tool_calls = data.tool_calls;
    this.role = data.role || 'assistant';
    this.is_partial = data.is_partial || false;
    this.raw_response = data.raw_response;
  }
} 