import { BaseAgent } from '../base/BaseAgent';
import { Message } from '../../models/request/LLMRequest';
import { LLMResponse, ToolCall } from '../../models/response/LLMResponse';
import { RunConfig } from '../../models/config/RunConfig';
import { BaseTool } from '../../tools/base/BaseTool';
import { LLMRegistry } from '../../llm/registry/LLMRegistry';
import { BaseLLM } from '../../llm/BaseLLM';
import { InvocationContext } from '../../models/context/InvocationContext';
import { ToolContext } from '../../models/context/ToolContext';
import { BaseMemoryService, SearchMemoryOptions } from '../../models/memory/MemoryService';
import { SessionService } from '../../memory/services/SessionService';

/**
 * Configuration for Agent
 */
export interface AgentConfig {
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * The LLM model to use
   */
  model: string;
  
  /**
   * Instructions for the agent
   */
  instructions?: string;
  
  /**
   * Tools available to the agent
   */
  tools?: BaseTool[];
  
  /**
   * Maximum number of tool execution steps
   */
  maxToolExecutionSteps?: number;
  
  /**
   * Memory service for long-term storage and retrieval
   */
  memoryService?: BaseMemoryService;
  
  /**
   * Session service for managing conversations
   */
  sessionService?: SessionService;
  
  /**
   * User ID for the session (required for session persistence)
   */
  userId?: string;
  
  /**
   * Application name (for multi-app environments)
   */
  appName?: string;
  
  /**
   * Whether to automatically augment prompts with relevant memory
   */
  useMemoryAugmentation?: boolean;
  
  /**
   * The maximum number of memory items to include in augmentation
   */
  maxMemoryItems?: number;
  
  /**
   * The minimum relevance score for memory augmentation (0-1)
   */
  memoryRelevanceThreshold?: number;
}

/**
 * Standard Agent implementation that uses an LLM
 */
export class Agent extends BaseAgent {
  /**
   * The LLM model to use
   */
  private model: string;
  
  /**
   * The LLM instance
   */
  private llm: BaseLLM;
  
  /**
   * Instructions for the agent
   */
  private instructions?: string;
  
  /**
   * Tools available to the agent
   */
  private tools: BaseTool[];
  
  /**
   * Maximum number of tool execution steps to prevent infinite loops
   */
  private maxToolExecutionSteps: number;
  
  /**
   * Memory service for long-term storage and retrieval
   */
  private memoryService?: BaseMemoryService;
  
  /**
   * Session service for managing conversations
   */
  private sessionService?: SessionService;
  
  /**
   * User ID for the session
   */
  private userId?: string;
  
  /**
   * Application name
   */
  private appName?: string;
  
  /**
   * Whether to automatically augment prompts with relevant memory
   */
  private useMemoryAugmentation: boolean;
  
  /**
   * The maximum number of memory items to include in augmentation
   */
  private maxMemoryItems: number;
  
  /**
   * The minimum relevance score for memory augmentation (0-1)
   */
  private memoryRelevanceThreshold: number;
  
  /**
   * Constructor for Agent
   */
  constructor(config: AgentConfig) {
    super({
      name: config.name,
      description: config.description
    });
    
    this.model = config.model;
    this.instructions = config.instructions;
    this.tools = config.tools || [];
    this.maxToolExecutionSteps = config.maxToolExecutionSteps || 10;
    this.memoryService = config.memoryService;
    this.sessionService = config.sessionService;
    this.userId = config.userId;
    this.appName = config.appName;
    this.useMemoryAugmentation = config.useMemoryAugmentation ?? false;
    this.maxMemoryItems = config.maxMemoryItems ?? 5;
    this.memoryRelevanceThreshold = config.memoryRelevanceThreshold ?? 0.3;
    
    // Get the LLM instance
    this.llm = LLMRegistry.newLLM(this.model);
  }
  
  /**
   * Finds a tool by name
   */
  private findTool(name: string): BaseTool | undefined {
    return this.tools.find(tool => tool.name === name);
  }
  
  /**
   * Executes a tool call and returns the result
   */
  private async executeTool(
    toolCall: ToolCall,
    context: InvocationContext
  ): Promise<{ name: string, result: any }> {
    try {
      // Find the corresponding tool
      const tool = this.findTool(toolCall.function.name);
      if (!tool) {
        throw new Error(`Tool not found: ${toolCall.function.name}`);
      }
      
      // Parse arguments from JSON string
      let args: Record<string, any>;
      try {
        args = JSON.parse(toolCall.function.arguments);
      } catch (error) {
        throw new Error(`Invalid arguments for tool ${toolCall.function.name}: ${toolCall.function.arguments}`);
      }
      
      // Create tool context
      const toolContext = new ToolContext({
        invocationContext: context,
        parameters: {}
      });
      
      // Execute the tool using safeExecute for better error handling
      console.log(`Executing tool: ${tool.name}`);
      const result = await tool.safeExecute(args, toolContext);
      console.log(`Tool ${tool.name} execution complete`);
      
      return {
        name: toolCall.function.name,
        result
      };
    } catch (error) {
      console.error(`Error executing tool ${toolCall.function.name}:`, error);
      return {
        name: toolCall.function.name,
        result: { error: error instanceof Error ? error.message : String(error) }
      };
    }
  }
  
  /**
   * Executes all tool calls and returns the results
   */
  private async executeTools(
    toolCalls: ToolCall[],
    context: InvocationContext
  ): Promise<{ name: string, result: any }[]> {
    // Execute tools in parallel
    const toolPromises = toolCalls.map(toolCall => 
      this.executeTool(toolCall, context)
    );
    
    return Promise.all(toolPromises);
  }
  
  /**
   * Augments context with relevant memory
   */
  private async augmentWithMemory(context: InvocationContext): Promise<void> {
    // Skip if memory augmentation is disabled or no memory service
    if (!this.useMemoryAugmentation || !context.memoryService) {
      return;
    }
    
    try {
      // Extract query from the last user message
      const lastUserMsg = [...context.messages].reverse().find(msg => msg.role === 'user');
      if (!lastUserMsg || !lastUserMsg.content) {
        return;
      }
      
      // Get the query text
      let query = '';
      if (typeof lastUserMsg.content === 'string') {
        query = lastUserMsg.content;
      } else if (Array.isArray(lastUserMsg.content)) {
        // Extract text from content array
        for (const part of lastUserMsg.content) {
          if (part.type === 'text') {
            query += part.text + ' ';
          }
        }
      } else if (lastUserMsg.content.type === 'text') {
        query = lastUserMsg.content.text;
      }
      
      if (!query.trim()) {
        return;
      }
      
      // Search memory with the query
      const searchOptions: SearchMemoryOptions = {
        threshold: this.memoryRelevanceThreshold,
        limit: this.maxMemoryItems
      };
      
      const memories = await context.searchMemory(query, searchOptions);
      
      // Skip if no relevant memories found
      if (!memories.memories.length) {
        return;
      }
      
      // Generate a summary of relevant memories to add as system message
      const relevantInfo: string[] = [];
      
      for (const memory of memories.memories) {
        const sessionId = memory.sessionId;
        const events = memory.events as Message[];
        
        // Format each memory
        const formattedEvents = events.map(event => {
          const role = event.role === 'user' ? 'User' : 'Assistant';
          let content = '';
          
          if (typeof event.content === 'string') {
            content = event.content;
          } else if (Array.isArray(event.content)) {
            // Extract text from content array
            for (const part of event.content) {
              if (part.type === 'text') {
                content += part.text + ' ';
              }
            }
          } else if (event.content && event.content.type === 'text') {
            content = event.content.text;
          }
          
          return `${role}: ${content}`;
        });
        
        relevantInfo.push(`Session ${sessionId.substring(0, 8)}:\n${formattedEvents.join('\n')}`);
      }
      
      // Add memory information as a system message at the beginning
      if (relevantInfo.length > 0) {
        const memoryMessage: Message = {
          role: 'system',
          content: `Relevant information from previous conversations:\n\n${relevantInfo.join('\n\n')}`
        };
        
        // Insert after existing system messages
        const lastSystemIndex = context.messages.findIndex(m => m.role !== 'system');
        if (lastSystemIndex > 0) {
          context.messages.splice(lastSystemIndex, 0, memoryMessage);
        } else {
          context.messages.unshift(memoryMessage);
        }
      }
    } catch (error) {
      console.error('Error augmenting with memory:', error);
      // Continue without memory augmentation on error
    }
  }
  
  /**
   * Saves the session to memory
   */
  private async saveToMemory(context: InvocationContext): Promise<void> {
    try {
      if (context.sessionService && this.userId) {
        // Ensure we have the user ID set
        context.userId = context.userId || this.userId;
        
        // Save the session
        await context.saveSession();
      }
    } catch (error) {
      console.error('Error saving to memory:', error);
      // Continue without saving to memory on error
    }
  }
  
  /**
   * Runs the agent with the given messages and configuration
   */
  async run(options: {
    messages: Message[];
    config?: RunConfig;
    sessionId?: string;
  }): Promise<LLMResponse> {
    const context = new InvocationContext({
      sessionId: options.sessionId,
      messages: options.messages,
      config: options.config,
      userId: this.userId,
      appName: this.appName,
      memoryService: this.memoryService,
      sessionService: this.sessionService
    });
    
    // Add system instructions if provided
    if (this.instructions) {
      context.messages.unshift({
        role: 'system',
        content: this.instructions
      });
    }
    
    // Augment with memory if enabled
    await this.augmentWithMemory(context);
    
    // Execute agent loop (thinking and tool execution)
    let currentResponse: LLMResponse | null = null;
    let stepCount = 0;
    
    while (stepCount < this.maxToolExecutionSteps) {
      console.log(`\n[Agent] Step ${stepCount + 1}: Thinking...`);
      
      // Get tool declarations
      const toolDeclarations = this.tools
        .map(tool => tool.getDeclaration())
        .filter(declaration => declaration !== null);
      
      // Create the request
      const request = {
        messages: context.messages,
        config: {
          functions: toolDeclarations as any[]
        }
      };
      
      // Generate content
      const responseGenerator = this.llm.generateContentAsync(request);
      const { value } = await responseGenerator.next();
      
      // Ensure we have a valid response
      if (!value) {
        throw new Error("No response received from LLM");
      }
      
      // Update current response
      currentResponse = value;
      
      // Add assistant response to conversation history
      context.addMessage({
        role: 'assistant',
        content: currentResponse.content || '',
        function_call: currentResponse.function_call
      });
      
      // Check if there are tool calls to execute
      const toolCalls = currentResponse.tool_calls || [];
      if (toolCalls.length === 0 && !currentResponse.function_call) {
        // No tool calls, we're done
        console.log(`[Agent] No tool calls, finishing...`);
        break;
      }
      
      console.log(`[Agent] Executing ${toolCalls.length || 1} tool(s)...`);
      stepCount++;
      
      // Execute function_call for backward compatibility
      if (currentResponse.function_call) {
        const toolCall = {
          id: 'function-call',
          function: {
            name: currentResponse.function_call.name,
            arguments: currentResponse.function_call.arguments
          }
        };
        
        const [result] = await this.executeTools([toolCall], context);
        
        // Add function response to conversation history
        context.addMessage({
          role: 'function',
          name: result.name,
          content: JSON.stringify(result.result)
        });
      } 
      // Execute tool_calls
      else if (toolCalls.length > 0) {
        const results = await this.executeTools(toolCalls, context);
        
        // Add tool responses to conversation history
        for (const result of results) {
          context.addMessage({
            role: 'tool',
            content: JSON.stringify(result.result),
            name: result.name,
            tool_call_id: toolCalls.find(tc => tc.function.name === result.name)?.id
          });
        }
      }
    }
    
    if (stepCount >= this.maxToolExecutionSteps) {
      console.warn(`[Agent] Reached maximum tool execution steps (${this.maxToolExecutionSteps}), halting execution`);
    }
    
    // Save the session to memory
    await this.saveToMemory(context);
    
    return currentResponse!;
  }
  
  /**
   * Runs the agent with streaming support
   */
  async *runStreaming(options: {
    messages: Message[];
    config?: RunConfig;
    sessionId?: string;
  }): AsyncGenerator<LLMResponse> {
    const context = new InvocationContext({
      sessionId: options.sessionId,
      messages: options.messages,
      config: options.config,
      userId: this.userId,
      appName: this.appName,
      memoryService: this.memoryService,
      sessionService: this.sessionService
    });
    
    // Add system instructions if provided
    if (this.instructions) {
      context.messages.unshift({
        role: 'system',
        content: this.instructions
      });
    }
    
    // Augment with memory if enabled
    await this.augmentWithMemory(context);
    
    // Execute agent loop (thinking and tool execution)
    let stepCount = 0;
    let hadToolCalls = false;
    
    while (stepCount < this.maxToolExecutionSteps) {
      console.log(`\n[Agent] Step ${stepCount + 1}: Thinking...`);
      
      // Get tool declarations
      const toolDeclarations = this.tools
        .map(tool => tool.getDeclaration())
        .filter(declaration => declaration !== null);
      
      // Create the request
      const request = {
        messages: context.messages,
        config: {
          functions: toolDeclarations as any[],
          stream: true
        }
      };
      
      // Stream response from LLM
      const responseGenerator = this.llm.generateContentAsync(request);
      
      // Capture the final response for tool execution
      let finalResponse: LLMResponse | null = null;
      hadToolCalls = false;
      
      // Stream response chunks
      for await (const responseChunk of responseGenerator) {
        // Update current full response
        finalResponse = responseChunk;
        
        // Yield the chunk
        yield responseChunk;
        
        // Check if there are tool calls to execute
        hadToolCalls = 
          Boolean(responseChunk.function_call) || 
          (responseChunk.tool_calls !== undefined && responseChunk.tool_calls.length > 0);
      }
      
      if (!finalResponse) {
        throw new Error("No response received from LLM");
      }
      
      // Add assistant response to conversation history
      context.addMessage({
        role: 'assistant',
        content: finalResponse.content || '',
        function_call: finalResponse.function_call
      });
      
      // If no tool calls, we're done
      if (!hadToolCalls) {
        console.log(`[Agent] No tool calls, finishing...`);
        break;
      }
      
      console.log(`[Agent] Executing tools...`);
      stepCount++;
      
      // Execute function_call for backward compatibility
      if (finalResponse.function_call) {
        const toolCall = {
          id: 'function-call',
          function: {
            name: finalResponse.function_call.name,
            arguments: finalResponse.function_call.arguments
          }
        };
        
        const [result] = await this.executeTools([toolCall], context);
        
        // Add function response to conversation history
        context.addMessage({
          role: 'function',
          name: result.name,
          content: JSON.stringify(result.result)
        });
      } 
      // Execute tool_calls
      else if (finalResponse.tool_calls && finalResponse.tool_calls.length > 0) {
        const results = await this.executeTools(finalResponse.tool_calls, context);
        
        // Add tool responses to conversation history
        for (const result of results) {
          context.addMessage({
            role: 'tool',
            content: JSON.stringify(result.result),
            name: result.name,
            tool_call_id: finalResponse.tool_calls.find(tc => tc.function.name === result.name)?.id
          });
        }
      }
    }
    
    if (stepCount >= this.maxToolExecutionSteps) {
      console.warn(`[Agent] Reached maximum tool execution steps (${this.maxToolExecutionSteps}), halting execution`);
    }
    
    // Save the session to memory
    await this.saveToMemory(context);
  }
} 