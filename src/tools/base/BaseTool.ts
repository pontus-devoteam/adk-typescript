import { FunctionDeclaration } from '../../models/request/FunctionDeclaration';
import { ToolContext } from '../../models/context/ToolContext';

/**
 * Configuration for tool initialization
 */
export interface ToolConfig {
  /**
   * Name of the tool
   */
  name: string;
  
  /**
   * Description of the tool
   */
  description: string;
  
  /**
   * Whether the tool is a long running operation
   */
  isLongRunning?: boolean;
  
  /**
   * Whether the tool execution should be retried on failure
   */
  shouldRetryOnFailure?: boolean;
  
  /**
   * Maximum retry attempts
   */
  maxRetryAttempts?: number;
}

/**
 * The base class for all tools
 */
export abstract class BaseTool {
  /**
   * Name of the tool
   */
  name: string;
  
  /**
   * Description of the tool
   */
  description: string;
  
  /**
   * Whether the tool is a long running operation
   */
  isLongRunning: boolean;
  
  /**
   * Whether the tool execution should be retried on failure
   */
  shouldRetryOnFailure: boolean;
  
  /**
   * Maximum retry attempts
   */
  maxRetryAttempts: number;

  /**
   * Base delay for retry in ms (will be used with exponential backoff)
   */
  baseRetryDelay: number = 1000;

  /**
   * Maximum delay for retry in ms
   */
  maxRetryDelay: number = 10000;
  
  /**
   * Constructor for BaseTool
   */
  constructor(config: ToolConfig) {
    this.name = config.name;
    this.description = config.description;
    this.isLongRunning = config.isLongRunning || false;
    this.shouldRetryOnFailure = config.shouldRetryOnFailure || false;
    this.maxRetryAttempts = config.maxRetryAttempts || 3;
    
    // Validate tool name format
    if (!/^[a-zA-Z0-9_]+$/.test(this.name)) {
      throw new Error(`Invalid tool name: "${this.name}". Tool names must contain only alphanumeric characters and underscores.`);
    }
    
    // Validate description
    if (!this.description || this.description.length < 3) {
      throw new Error(`Tool description for "${this.name}" is too short. Provide a meaningful description.`);
    }
  }
  
  /**
   * Gets the OpenAPI specification of this tool in the form of a FunctionDeclaration
   */
  abstract getDeclaration(): FunctionDeclaration;
  
  /**
   * Validates the arguments against the schema in the function declaration
   * @param args Arguments to validate
   * @returns True if arguments are valid
   */
  validateArguments(args: Record<string, any>): boolean {
    // Get the function declaration
    const declaration = this.getDeclaration();
    if (!declaration || !declaration.parameters) {
      return true; // No validation possible
    }
    
    // Check required parameters
    const required = declaration.parameters.required || [];
    for (const param of required) {
      if (!(param in args)) {
        console.error(`Missing required parameter "${param}" for tool "${this.name}"`);
        return false;
      }
    }
    
    // Basic type validation could be added here in the future
    return true;
  }
  
  /**
   * Runs the tool with the given arguments and context
   * This method must be implemented by subclasses
   * 
   * @param args Arguments for the tool
   * @param context Tool execution context
   * @returns Result of the tool execution
   */
  abstract runAsync(args: Record<string, any>, context: ToolContext): Promise<any>;
  
  /**
   * Executes the tool with error handling and retries
   * 
   * @param args Arguments for the tool
   * @param context Tool execution context
   * @returns Result of the tool execution or error information
   */
  async safeExecute(args: Record<string, any>, context: ToolContext): Promise<any> {
    // Validate arguments
    if (!this.validateArguments(args)) {
      return {
        error: "Invalid arguments",
        message: "The provided arguments do not match the tool's requirements."
      };
    }
    
    let lastError: Error | null = null;
    let attempts = 0;
    
    // Attempt execution with retries if configured
    while (attempts <= (this.shouldRetryOnFailure ? this.maxRetryAttempts : 0)) {
      try {
        if (attempts > 0) {
          if (process.env.DEBUG === 'true') {
            console.log(`Retrying tool ${this.name} (attempt ${attempts} of ${this.maxRetryAttempts})...`);
          }
          
          const delay = Math.min(
            this.baseRetryDelay * Math.pow(2, attempts - 1) + Math.random() * 1000,
            this.maxRetryDelay
          );

          await new Promise(resolve => setTimeout(resolve, delay));
          
          const result = await this.runAsync(args, context);
          return { result };
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.error(`Error executing tool ${this.name}:`, lastError.message);
        attempts++;
      }
    }
    
    // If we get here, all attempts failed
    return {
      error: "Execution failed",
      message: lastError?.message || "Unknown error occurred",
      tool: this.name
    };
  }
} 