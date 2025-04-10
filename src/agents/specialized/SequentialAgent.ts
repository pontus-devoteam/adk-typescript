import { BaseAgent } from '../base/BaseAgent';
import { Message } from '../../models/request/LLMRequest';
import { LLMResponse } from '../../models/response/LLMResponse';
import { RunConfig } from '../../models/config/RunConfig';

/**
 * Configuration for SequentialAgent
 */
export interface SequentialAgentConfig {
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * Sub-agents to execute in sequence
   */
  agents?: BaseAgent[];
}

/**
 * Extended LLMResponse interface that includes metadata
 */
interface EnhancedLLMResponse extends LLMResponse {
  metadata?: Record<string, any>;
}

/**
 * Sequential Agent that executes sub-agents in sequence
 * Each sub-agent's output becomes input to the next agent
 */
export class SequentialAgent extends BaseAgent {
  /**
   * Constructor for SequentialAgent
   */
  constructor(config: SequentialAgentConfig) {
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
   * Executes sub-agents sequentially, passing output from one to the next
   */
  async run(options: {
    messages: Message[];
    config?: RunConfig;
  }): Promise<EnhancedLLMResponse> {
    // Log execution
    console.log(`[SequentialAgent] Running ${this.subAgents.length} sub-agents in sequence`);
    
    if (this.subAgents.length === 0) {
      return {
        content: "No sub-agents defined for sequential execution.",
        role: 'assistant',
        metadata: {
          agent_name: this.name,
          agent_type: "sequential",
          status: "empty"
        }
      };
    }
    
    const currentMessages = [...options.messages];
    let finalResponse: EnhancedLLMResponse | null = null;
    
    // Execute agents in sequence
    for (let i = 0; i < this.subAgents.length; i++) {
      const agent = this.subAgents[i];
      console.log(`[SequentialAgent] Running sub-agent ${i + 1}/${this.subAgents.length}: ${agent.name}`);
      
      try {
        // Run the current agent with the messages
        const response = await agent.run({
          messages: currentMessages,
          config: options.config
        }) as EnhancedLLMResponse;
        
        // Store response
        finalResponse = response;
        
        // Prepare input for the next agent by adding the response as a message
        if (i < this.subAgents.length - 1) {
          currentMessages.push({
            role: 'assistant',
            content: response.content || '',
            function_call: response.function_call
          });
        }
      } catch (error) {
        console.error(`[SequentialAgent] Error in sub-agent ${agent.name}:`, error);
        return {
          content: `Error in sub-agent ${agent.name}: ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant',
          metadata: {
            agent_name: this.name,
            agent_type: "sequential",
            error: true,
            sub_agent: agent.name
          }
        };
      }
    }
    
    // Return the final response with metadata
    if (!finalResponse) {
      return {
        content: "No response generated from sequential execution.",
        role: 'assistant',
        metadata: {
          agent_name: this.name,
          agent_type: "sequential",
          status: "no_response"
        }
      };
    }
    
    // Add metadata about the sequential execution
    return {
      ...finalResponse,
      metadata: {
        ...(finalResponse.metadata || {}),
        agent_name: this.name,
        agent_type: "sequential"
      }
    };
  }
  
  /**
   * Runs the agent with streaming support
   * Streams responses from each sub-agent in sequence
   */
  async *runStreaming(options: {
    messages: Message[];
    config?: RunConfig;
  }): AsyncIterable<EnhancedLLMResponse> {
    // Log execution
    console.log(`[SequentialAgent] Streaming ${this.subAgents.length} sub-agents in sequence`);
    
    if (this.subAgents.length === 0) {
      yield {
        content: "No sub-agents defined for sequential execution.",
        role: 'assistant',
        metadata: {
          agent_name: this.name,
          agent_type: "sequential",
          status: "empty"
        }
      };
      return;
    }
    
    const currentMessages = [...options.messages];
    
    // Execute agents in sequence with streaming
    for (let i = 0; i < this.subAgents.length; i++) {
      const agent = this.subAgents[i];
      console.log(`[SequentialAgent] Streaming sub-agent ${i + 1}/${this.subAgents.length}: ${agent.name}`);
      
      try {
        // Run the current agent with streaming
        const streamGenerator = agent.runStreaming({
          messages: currentMessages,
          config: options.config
        });
        
        // Collect all chunks to build the complete response for the next agent
        const chunks: EnhancedLLMResponse[] = [];
        let lastChunk: EnhancedLLMResponse | null = null;
        
        // Stream each chunk from the current agent
        for await (const chunk of streamGenerator) {
          // Add metadata about the sequential execution
          const enhancedChunk = {
            ...chunk,
            metadata: {
              ...(chunk as EnhancedLLMResponse).metadata || {},
              agent_name: this.name,
              agent_type: "sequential",
              sub_agent: agent.name,
              sub_agent_index: i,
              sub_agent_count: this.subAgents.length
            }
          } as EnhancedLLMResponse;
          
          yield enhancedChunk;
          chunks.push(chunk as EnhancedLLMResponse);
          lastChunk = chunk as EnhancedLLMResponse;
        }
        
        // Prepare input for the next agent
        if (i < this.subAgents.length - 1 && lastChunk) {
          currentMessages.push({
            role: 'assistant',
            content: lastChunk.content || '',
            function_call: lastChunk.function_call
          });
        }
      } catch (error) {
        console.error(`[SequentialAgent] Error in streaming sub-agent ${agent.name}:`, error);
        yield {
          content: `Error in sub-agent ${agent.name}: ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant',
          metadata: {
            agent_name: this.name,
            agent_type: "sequential",
            error: true,
            sub_agent: agent.name
          }
        };
        return;
      }
    }
  }
} 