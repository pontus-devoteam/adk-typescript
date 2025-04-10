import { InvocationContext } from './InvocationContext';
import { AuthHandler } from '../auth/AuthHandler';

/**
 * Context for tool execution
 */
export class ToolContext {
  /**
   * The parent invocation context
   */
  invocationContext: InvocationContext;
  
  /**
   * Authentication handler for the tool
   */
  auth?: AuthHandler;
  
  /**
   * Additional parameters for the tool
   */
  parameters: Record<string, any>;
  
  /**
   * Constructor for ToolContext
   */
  constructor(options: {
    invocationContext: InvocationContext;
    auth?: AuthHandler;
    parameters?: Record<string, any>;
  }) {
    this.invocationContext = options.invocationContext;
    this.auth = options.auth;
    this.parameters = options.parameters || {};
  }
  
  /**
   * Gets a parameter value
   */
  getParameter<T>(name: string, defaultValue?: T): T | undefined {
    return (name in this.parameters)
      ? this.parameters[name] as T
      : defaultValue;
  }
  
  /**
   * Sets a parameter value
   */
  setParameter(name: string, value: any): void {
    this.parameters[name] = value;
  }
} 