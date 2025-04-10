/**
 * JSON Schema type for function parameters
 */
export interface JSONSchema {
  type: string;
  properties?: Record<string, JSONSchema>;
  items?: JSONSchema;
  required?: string[];
  enum?: string[];
  description?: string;
  format?: string;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  default?: any;
  [key: string]: any;
}

/**
 * Represents a function declaration for the LLM
 */
export interface FunctionDeclaration {
  /**
   * Name of the function
   */
  name: string;
  
  /**
   * Description of what the function does
   */
  description: string;
  
  /**
   * Parameters schema in JSON Schema format
   */
  parameters: JSONSchema;
} 