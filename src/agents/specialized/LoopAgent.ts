import { BaseAgent } from '../base/BaseAgent';
import { Message, MessageRole } from '../../models/request/LLMRequest';
import { LLMResponse } from '../../models/response/LLMResponse';
import { RunConfig } from '../../models/config/RunConfig';

/**
 * Configuration for LoopAgent
 */
export interface LoopAgentConfig {
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * Sub-agent to execute in a loop
   */
  agent?: BaseAgent;
  
  /**
   * Maximum number of iterations
   */
  maxIterations?: number;
  
  /**
   * Agent that decides whether to continue the loop
   */
  conditionAgent?: BaseAgent;
  
  /**
   * Custom condition check function
   */
  conditionCheck?: (response: LLMResponse) => boolean | Promise<boolean>;
}

/**
 * Loop Agent that executes sub-agents in a loop
 * Repeatedly executes a sub-agent until a condition is met
 */
export class LoopAgent extends BaseAgent {
  /**
   * Maximum number of iterations to prevent infinite loops
   */
  private maxIterations: number;
  
  /**
   * Agent that decides whether to continue the loop
   */
  private conditionAgent?: BaseAgent;
  
  /**
   * Custom condition check function
   */
  private conditionCheck?: (response: LLMResponse) => boolean | Promise<boolean>;
  
  /**
   * Constructor for LoopAgent
   */
  constructor(config: LoopAgentConfig) {
    super({
      name: config.name,
      description: config.description
    });
    
    // Set maximum iterations (default to 10)
    this.maxIterations = config.maxIterations || 10;
    
    // Set condition agent if provided
    this.conditionAgent = config.conditionAgent;
    
    // Set condition check function if provided
    this.conditionCheck = config.conditionCheck;
    
    // Add the agent to execute in a loop
    if (config.agent) {
      this.addSubAgent(config.agent);
    }
  }
  
  /**
   * Default condition check that always returns true
   * to continue the loop until maxIterations is reached
   */
  private async defaultConditionCheck(): Promise<boolean> {
    return true;
  }
  
  /**
   * Check if the loop should continue
   */
  private async shouldContinue(
    response: LLMResponse, 
    iterationCount: number, 
    messages: Message[],
    config?: RunConfig
  ): Promise<boolean> {
    // Stop if we've reached maximum iterations
    if (iterationCount >= this.maxIterations) {
      if (process.env.DEBUG === 'true') {
        console.log(`[LoopAgent] Maximum iterations (${this.maxIterations}) reached. Stopping loop.`);
      }
      return false;
    }
    
    // Use custom condition check if provided
    if (this.conditionCheck) {
      const shouldContinue = await this.conditionCheck(response);
      if (process.env.DEBUG === 'true') {
        console.log(`[LoopAgent] Custom condition check result: ${shouldContinue}`);
      }
      return shouldContinue;
    }
    
    // Use condition agent if provided
    if (this.conditionAgent) {
      if (process.env.DEBUG === 'true') {
        console.log(`[LoopAgent] Using condition agent ${this.conditionAgent.name} to check loop condition`);
      }
      
      // Add the response to messages for the condition agent
      const conditionMessages: Message[] = [
        ...messages,
        {
          role: 'assistant' as MessageRole,
          content: response.content || ''
        },
        {
          role: 'user' as MessageRole,
          content: 'Should the loop continue? Respond with "yes" to continue or "no" to stop.'
        }
      ];
      
      // Run the condition agent
      try {
        const conditionResponse = await this.conditionAgent.run({
          messages: conditionMessages,
          config
        });
        
        // Check response content for yes/no
        const content = conditionResponse.content?.toLowerCase() || '';
        const shouldContinue = content.includes('yes') && !content.includes('no');
        
        if (process.env.DEBUG === 'true') {
          console.log(`[LoopAgent] Condition agent result: ${shouldContinue ? 'Continue loop' : 'Stop loop'}`);
        }
        return shouldContinue;
      } catch (error) {
        console.error(`[LoopAgent] Error in condition agent:`, error);
        return false;
      }
    }
    
    // Default behavior is to continue until maxIterations
    return this.defaultConditionCheck();
  }
  
  /**
   * Runs the agent with the given messages and configuration
   * Executes the sub-agent in a loop until the condition is met
   */
  async run(options: {
    messages: Message[];
    config?: RunConfig;
  }): Promise<LLMResponse> {
    // Log execution
    if (process.env.DEBUG === 'true') {
      console.log(`[LoopAgent] Starting loop with max ${this.maxIterations} iterations`);
    }
    
    if (this.subAgents.length === 0) {
      return {
        content: "No sub-agent defined for loop execution.",
        role: 'assistant'
      };
    }
    
    // Get the agent to loop
    const loopAgent = this.subAgents[0];
    
    // Initialize loop variables
    let iterationCount = 0;
    const currentMessages = [...options.messages];
    let lastResponse: LLMResponse | null = null;
    let shouldContinueLoop = true;
    
    // Execute the loop
    while (shouldContinueLoop && iterationCount < this.maxIterations) {
      iterationCount++;
      if (process.env.DEBUG === 'true') {
        console.log(`[LoopAgent] Running iteration ${iterationCount}/${this.maxIterations}`);
      }
      
      try {
        // Run the agent
        const response = await loopAgent.run({
          messages: currentMessages,
          config: options.config
        });
        
        // Store the response
        lastResponse = response;
        
        // Add the response to messages for the next iteration
        currentMessages.push({
          role: 'assistant' as MessageRole,
          content: response.content || ''
        });
        
        // Check if we should continue the loop
        shouldContinueLoop = await this.shouldContinue(
          response,
          iterationCount,
          currentMessages,
          options.config
        );
        
        // If we're continuing, add a transition message for the next iteration
        if (shouldContinueLoop) {
          currentMessages.push({
            role: 'user' as MessageRole,
            content: `Iteration ${iterationCount} complete. Continue to iteration ${iterationCount + 1}.`
          });
        }
      } catch (error) {
        console.error(`[LoopAgent] Error in loop iteration ${iterationCount}:`, error);
        break;
      }
    }
    
    // Prepare the final response
    if (!lastResponse) {
      return {
        content: "No response generated from loop execution.",
        role: 'assistant'
      };
    }
    
    // Return the final response with loop information
    return {
      content: `Completed ${iterationCount} iterations. Final result:\n\n${lastResponse.content || ""}`,
      role: 'assistant'
    };
  }
  
  /**
   * Runs the agent with streaming support
   */
  async *runStreaming(options: {
    messages: Message[];
    config?: RunConfig;
  }): AsyncIterable<LLMResponse> {
    // Log execution
    if (process.env.DEBUG === 'true') {
      console.log(`[LoopAgent] Starting loop with max ${this.maxIterations} iterations (streaming)`);
    }
    
    if (this.subAgents.length === 0) {
      yield {
        content: "No sub-agent defined for loop execution.",
        role: 'assistant'
      };
      return;
    }
    
    // Get the agent to loop
    const loopAgent = this.subAgents[0];
    
    // Initialize loop variables
    let iterationCount = 0;
    const currentMessages = [...options.messages];
    let shouldContinueLoop = true;
    
    // Initial status message
    yield {
      content: `Starting loop execution with max ${this.maxIterations} iterations...`,
      role: 'assistant',
      is_partial: true
    };
    
    // Execute the loop
    while (shouldContinueLoop && iterationCount < this.maxIterations) {
      iterationCount++;
      if (process.env.DEBUG === 'true') {
        console.log(`[LoopAgent] Running iteration ${iterationCount}/${this.maxIterations} (streaming)`);
      }
      
      // Status update for this iteration
      yield {
        content: `Running iteration ${iterationCount}/${this.maxIterations}...`,
        role: 'assistant',
        is_partial: true
      };
      
      try {
        // Run the agent with streaming
        const streamGenerator = loopAgent.runStreaming({
          messages: currentMessages,
          config: options.config
        });
        
        // Track the last non-partial chunk
        let lastChunk: LLMResponse | null = null;
        
        // Stream each chunk from the current iteration
        for await (const chunk of streamGenerator) {
          // Enhance the chunk with loop information
          const enhancedChunk = {
            ...chunk,
            content: `Iteration ${iterationCount}/${this.maxIterations}: ${chunk.content || ""}`,
            is_partial: true
          };
          
          yield enhancedChunk;
          
          if (!chunk.is_partial) {
            lastChunk = chunk;
          }
        }
        
        // Need the last complete chunk for condition checking
        if (!lastChunk) {
          if (process.env.DEBUG === 'true') {
            console.warn(`[LoopAgent] No complete chunk received from iteration ${iterationCount}`);
          }
          shouldContinueLoop = false;
          continue;
        }
        
        // Add the response to messages for the next iteration
        currentMessages.push({
          role: 'assistant' as MessageRole,
          content: lastChunk.content || ''
        });
        
        // Check if we should continue the loop
        shouldContinueLoop = await this.shouldContinue(
          lastChunk,
          iterationCount,
          currentMessages,
          options.config
        );
        
        // If we're continuing, add a transition message for the next iteration
        if (shouldContinueLoop) {
          currentMessages.push({
            role: 'user' as MessageRole,
            content: `Iteration ${iterationCount} complete. Continue to iteration ${iterationCount + 1}.`
          });
          
          // Status update between iterations
          yield {
            content: `Completed iteration ${iterationCount}. ${shouldContinueLoop ? 'Continuing to next iteration...' : 'Loop complete.'}`,
            role: 'assistant',
            is_partial: shouldContinueLoop
          };
        }
      } catch (error) {
        console.error(`[LoopAgent] Error in loop iteration ${iterationCount}:`, error);
        yield {
          content: `Error in loop iteration ${iterationCount}: ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant'
        };
        return;
      }
    }
    
    // Final message summarizing the loop execution
    yield {
      content: `Loop execution completed after ${iterationCount} iterations.`,
      role: 'assistant'
    };
  }
} 