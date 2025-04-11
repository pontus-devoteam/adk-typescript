import { BaseAgent } from '../base/BaseAgent';
import { Message } from '../../models/request/LLMRequest';
import { LLMResponse } from '../../models/response/LLMResponse';
import { RunConfig } from '../../models/config/RunConfig';

/**
 * Configuration for ParallelAgent
 */
export interface ParallelAgentConfig {
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * Sub-agents to execute in parallel
   */
  agents?: BaseAgent[];
}

/**
 * Parallel Agent that executes sub-agents in parallel
 * All sub-agents execute independently with the same input
 */
export class ParallelAgent extends BaseAgent {
  /**
   * Constructor for ParallelAgent
   */
  constructor(config: ParallelAgentConfig) {
    super({
      name: config.name,
      description: config.description
    });
    
    // Add sub-agents if provided
    if (config.agents && config.agents.length > 0) {
      for (const agent of config.agents) {
        this.addSubAgent(agent);
      }
    }
  }
  
  /**
   * Runs the agent with the given messages and configuration
   * Executes all sub-agents in parallel
   */
  async run(options: {
    messages: Message[];
    config?: RunConfig;
  }): Promise<LLMResponse> {
    // Log execution
    if (process.env.DEBUG === 'true') {
      console.log(`[ParallelAgent] Running ${this.subAgents.length} sub-agents in parallel`);
    }
    
    if (this.subAgents.length === 0) {
      return {
        content: "No sub-agents defined for parallel execution.",
        role: 'assistant'
      };
    }
    
    // Create promise array for parallel execution
    const agentPromises = this.subAgents.map(agent => {
      return agent.run({
        messages: options.messages,
        config: options.config
      }).catch(error => {
        console.error(`[ParallelAgent] Error in sub-agent ${agent.name}:`, error);
        return {
          content: `Error in sub-agent ${agent.name}: ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant'
        } as LLMResponse;
      });
    });
    
    // Execute all agents in parallel
    const results = await Promise.all(agentPromises);
    
    // Combine results from all agents
    let combinedContent = "";
    for (let i = 0; i < results.length; i++) {
      const agentName = this.subAgents[i].name;
      const result = results[i];
      
      // Add agent result to combined content
      combinedContent += `### ${agentName}\n\n${result.content || "No content"}\n\n`;
    }
    
    // Return combined results
    return {
      content: combinedContent.trim(),
      role: 'assistant'
    };
  }
  
  /**
   * Runs the agent with streaming support
   * Collects streaming responses from all sub-agents
   */
  async *runStreaming(options: {
    messages: Message[];
    config?: RunConfig;
  }): AsyncIterable<LLMResponse> {
    // Log execution
    if (process.env.DEBUG === 'true') {
      console.log(`[ParallelAgent] Streaming ${this.subAgents.length} sub-agents in parallel`);
    }
    
    if (this.subAgents.length === 0) {
      yield {
        content: "No sub-agents defined for parallel execution.",
        role: 'assistant'
      };
      return;
    }
    
    // Since we can't easily stream results from multiple concurrent async generators,
    // we'll run them in parallel and combine the final results
    const agentPromises = this.subAgents.map(agent => {
      return agent.run({
        messages: options.messages,
        config: options.config
      }).catch(error => {
        console.error(`[ParallelAgent] Error in sub-agent ${agent.name}:`, error);
        return {
          content: `Error in sub-agent ${agent.name}: ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant'
        } as LLMResponse;
      });
    });
    
    // First yield a starting message
    yield {
      content: `Starting parallel execution of ${this.subAgents.length} agents...`,
      role: 'assistant',
      is_partial: true
    };
    
    // Execute all agents in parallel and yield updates as they complete
    const results: Array<{ agent: BaseAgent, response: LLMResponse }> = [];
    const pendingPromises = [...agentPromises];
    
    // Process agents as they complete
    while (pendingPromises.length > 0) {
      const completedPromise = await Promise.race(
        pendingPromises.map((promise, index) => 
          promise.then(result => ({ index, result }))
        )
      );
      
      // Remove the completed promise
      const completedAgent = this.subAgents[completedPromise.index];
      pendingPromises.splice(completedPromise.index, 1);
      this.subAgents.splice(completedPromise.index, 1);
      
      // Store result
      results.push({
        agent: completedAgent,
        response: completedPromise.result
      });
      
      // Build the current combined response
      let combinedContent = "";
      for (const { agent, response } of results) {
        combinedContent += `### ${agent.name}\n\n${response.content || "No content"}\n\n`;
      }
      
      // Add pending agents
      if (pendingPromises.length > 0) {
        combinedContent += `\n### Waiting for ${pendingPromises.length} more agents to complete...\n`;
      }
      
      // Yield the current state
      yield {
        content: combinedContent.trim(),
        role: 'assistant',
        is_partial: pendingPromises.length > 0
      };
    }
    
    // Final combined response should have already been yielded in the loop
  }
} 