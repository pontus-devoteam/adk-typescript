import { BaseAgent } from '../base/BaseAgent';
import { Message, MessageRole } from '../../models/request/LLMRequest';
import { LLMResponse } from '../../models/response/LLMResponse';
import { RunConfig } from '../../models/config/RunConfig';
import { InvocationContext } from '../../models/context/InvocationContext';

/**
 * Represents a node in a LangGraph workflow
 */
export interface LangGraphNode {
  /**
   * Name of the node
   */
  name: string;
  
  /**
   * Agent associated with this node
   */
  agent: BaseAgent;
  
  /**
   * Target nodes to execute after this node
   */
  targets?: string[];
  
  /**
   * Condition function to determine if this node should execute
   */
  condition?: (result: LLMResponse, context: InvocationContext) => boolean | Promise<boolean>;
}

/**
 * Configuration for LangGraphAgent
 */
export interface LangGraphAgentConfig {
  /**
   * Name of the agent
   */
  name: string;
  
  /**
   * Description of the agent
   */
  description: string;
  
  /**
   * Graph nodes (agents and their connections)
   */
  nodes: LangGraphNode[];
  
  /**
   * Root node to start execution from
   */
  rootNode: string;
  
  /**
   * Maximum number of steps to prevent infinite loops
   */
  maxSteps?: number;
}

/**
 * LangGraphAgent that implements a directed graph of agents
 * Allows complex workflows with conditional branching
 */
export class LangGraphAgent extends BaseAgent {
  /**
   * Graph nodes (agents and their connections)
   */
  private nodes: Map<string, LangGraphNode>;
  
  /**
   * Root node to start execution from
   */
  private rootNode: string;
  
  /**
   * Maximum number of steps to prevent infinite loops
   */
  private maxSteps: number;
  
  /**
   * Constructor for LangGraphAgent
   */
  constructor(config: LangGraphAgentConfig) {
    super({
      name: config.name,
      description: config.description
    });
    
    // Initialize nodes map
    this.nodes = new Map<string, LangGraphNode>();
    
    // Add all nodes to the map
    for (const node of config.nodes) {
      if (this.nodes.has(node.name)) {
        throw new Error(`Duplicate node name in graph: ${node.name}`);
      }
      this.nodes.set(node.name, node);
      this.addSubAgent(node.agent);
    }
    
    // Set root node
    if (!this.nodes.has(config.rootNode)) {
      throw new Error(`Root node "${config.rootNode}" not found in graph nodes`);
    }
    this.rootNode = config.rootNode;
    
    // Set max steps (default to 50)
    this.maxSteps = config.maxSteps || 50;
    
    // Validate graph for cycles and unreachable nodes
    this.validateGraph();
  }
  
  /**
   * Validates the graph for potential issues
   */
  private validateGraph(): void {
    // Check all target nodes exist
    for (const [nodeName, node] of this.nodes.entries()) {
      if (node.targets) {
        for (const target of node.targets) {
          if (!this.nodes.has(target)) {
            throw new Error(`Node "${nodeName}" targets non-existent node "${target}"`);
          }
        }
      }
    }
    
    // TODO: Add cycle detection if needed
  }
  
  /**
   * Gets the next nodes to execute based on the current node and its result
   */
  private async getNextNodes(
    currentNode: LangGraphNode,
    result: LLMResponse,
    context: InvocationContext
  ): Promise<LangGraphNode[]> {
    if (!currentNode.targets || currentNode.targets.length === 0) {
      // Terminal node
      return [];
    }
    
    const nextNodes: LangGraphNode[] = [];
    
    for (const targetName of currentNode.targets) {
      const targetNode = this.nodes.get(targetName);
      if (!targetNode) {
        console.error(`[LangGraphAgent] Target node "${targetName}" not found`);
        continue;
      }
      
      // Check condition if exists
      if (targetNode.condition) {
        const shouldExecute = await targetNode.condition(result, context);
        if (!shouldExecute) {
          console.log(`[LangGraphAgent] Skipping node "${targetName}" due to condition`);
          continue;
        }
      }
      
      nextNodes.push(targetNode);
    }
    
    return nextNodes;
  }
  
  /**
   * Runs the agent with the given messages and configuration
   * Executes the graph by traversing nodes based on conditions
   */
  async run(options: {
    messages: Message[];
    config?: RunConfig;
  }): Promise<LLMResponse> {
    // Create invocation context
    const context = new InvocationContext({
      messages: options.messages,
      config: options.config
    });
    
    console.log(`[LangGraphAgent] Starting graph execution from root node "${this.rootNode}"`);
    
    if (this.nodes.size === 0) {
      return {
        content: "No nodes defined in the graph.",
        role: 'assistant'
      };
    }
    
    // Start with the root node
    const rootNode = this.nodes.get(this.rootNode);
    if (!rootNode) {
      return {
        content: `Root node "${this.rootNode}" not found.`,
        role: 'assistant'
      };
    }
    
    // Initialize execution
    let stepCount = 0;
    let lastResponse: LLMResponse | null = null;
    const nodesToExecute: Array<{ node: LangGraphNode, messages: Message[] }> = [
      { node: rootNode, messages: [...options.messages] }
    ];
    
    // Track executed nodes for logging
    const executedNodes: string[] = [];
    
    // Execute the graph
    while (nodesToExecute.length > 0 && stepCount < this.maxSteps) {
      stepCount++;
      
      // Get next node to execute
      const { node, messages } = nodesToExecute.shift()!;
      console.log(`[LangGraphAgent] Step ${stepCount}: Executing node "${node.name}"`);
      executedNodes.push(node.name);
      
      try {
        // Run the agent
        const response = await node.agent.run({
          messages,
          config: options.config
        });
        
        // Store the response
        lastResponse = response;
        
        // Create child context for next nodes
        const childContext = context.createChildContext();
        childContext.addMessage({
          role: 'assistant' as MessageRole,
          content: response.content || ''
        });
        
        // Prepare messages for next nodes
        const nextMessages = [
          ...messages,
          {
            role: 'assistant' as MessageRole,
            content: response.content || ''
          }
        ];
        
        // Get next nodes to execute
        const nextNodes = await this.getNextNodes(node, response, childContext);
        for (const nextNode of nextNodes) {
          nodesToExecute.push({
            node: nextNode,
            messages: nextMessages
          });
        }
      } catch (error) {
        console.error(`[LangGraphAgent] Error in node "${node.name}":`, error);
        return {
          content: `Error in node "${node.name}": ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant'
        };
      }
    }
    
    // Check if we hit the step limit
    if (stepCount >= this.maxSteps && nodesToExecute.length > 0) {
      console.warn(`[LangGraphAgent] Reached maximum step count (${this.maxSteps})`);
      return {
        content: `Graph execution stopped after reaching maximum step count (${this.maxSteps}).`,
        role: 'assistant'
      };
    }
    
    // Prepare the final response
    if (!lastResponse) {
      return {
        content: "No response generated from graph execution.",
        role: 'assistant'
      };
    }
    
    // Return the final response with graph information
    return {
      content: `Graph execution completed (path: ${executedNodes.join(' -> ')}).\n\n${lastResponse.content || ""}`,
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
    // Create invocation context
    const context = new InvocationContext({
      messages: options.messages,
      config: options.config
    });
    
    console.log(`[LangGraphAgent] Starting graph execution from root node "${this.rootNode}" (streaming)`);
    
    if (this.nodes.size === 0) {
      yield {
        content: "No nodes defined in the graph.",
        role: 'assistant'
      };
      return;
    }
    
    // Start with the root node
    const rootNode = this.nodes.get(this.rootNode);
    if (!rootNode) {
      yield {
        content: `Root node "${this.rootNode}" not found.`,
        role: 'assistant'
      };
      return;
    }
    
    // Initial status message
    yield {
      content: `Starting graph execution from root node "${this.rootNode}"...`,
      role: 'assistant',
      is_partial: true
    };
    
    // Initialize execution
    let stepCount = 0;
    const nodesToExecute: Array<{ node: LangGraphNode, messages: Message[] }> = [
      { node: rootNode, messages: [...options.messages] }
    ];
    
    // Track executed nodes for logging
    const executedNodes: string[] = [];
    
    // Execute the graph
    while (nodesToExecute.length > 0 && stepCount < this.maxSteps) {
      stepCount++;
      
      // Get next node to execute
      const { node, messages } = nodesToExecute.shift()!;
      console.log(`[LangGraphAgent] Step ${stepCount}: Executing node "${node.name}" (streaming)`);
      executedNodes.push(node.name);
      
      // Status update for this node
      yield {
        content: `Step ${stepCount}: Executing node "${node.name}"...`,
        role: 'assistant',
        is_partial: true
      };
      
      try {
        // Run the agent with streaming
        const streamGenerator = node.agent.runStreaming({
          messages,
          config: options.config
        });
        
        // Stream each chunk from the current node
        for await (const chunk of streamGenerator) {
          // Enhance the chunk with node information
          const enhancedChunk = {
            ...chunk,
            content: `[Node: ${node.name}] ${chunk.content || ""}`,
            is_partial: true
          };
          
          yield enhancedChunk;
        }
        
        // Run the agent again to get the final result
        const response = await node.agent.run({
          messages,
          config: options.config
        });
        
        // Create child context for next nodes
        const childContext = context.createChildContext();
        childContext.addMessage({
          role: 'assistant' as MessageRole,
          content: response.content || ''
        });
        
        // Prepare messages for next nodes
        const nextMessages = [
          ...messages,
          {
            role: 'assistant' as MessageRole,
            content: response.content || ''
          }
        ];
        
        // Get next nodes to execute
        const nextNodes = await this.getNextNodes(node, response, childContext);
        
        // Status update about flow
        if (nextNodes.length > 0) {
          const nextNodeNames = nextNodes.map(n => n.name).join(', ');
          yield {
            content: `Completed node "${node.name}". Next node(s): ${nextNodeNames}`,
            role: 'assistant',
            is_partial: true
          };
        } else {
          yield {
            content: `Completed node "${node.name}". No more nodes to execute.`,
            role: 'assistant',
            is_partial: nodesToExecute.length > 0
          };
        }
        
        // Add next nodes to execution queue
        for (const nextNode of nextNodes) {
          nodesToExecute.push({
            node: nextNode,
            messages: nextMessages
          });
        }
      } catch (error) {
        console.error(`[LangGraphAgent] Error in node "${node.name}":`, error);
        yield {
          content: `Error in node "${node.name}": ${error instanceof Error ? error.message : String(error)}`,
          role: 'assistant'
        };
        return;
      }
    }
    
    // Check if we hit the step limit
    if (stepCount >= this.maxSteps && nodesToExecute.length > 0) {
      console.warn(`[LangGraphAgent] Reached maximum step count (${this.maxSteps})`);
      yield {
        content: `Graph execution stopped after reaching maximum step count (${this.maxSteps}).`,
        role: 'assistant'
      };
      return;
    }
    
    // Final message summarizing the graph execution
    yield {
      content: `Graph execution completed. Path: ${executedNodes.join(' -> ')}`,
      role: 'assistant'
    };
  }
} 