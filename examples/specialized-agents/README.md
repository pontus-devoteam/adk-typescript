# Specialized Agents Example

This example demonstrates how to use the specialized agent types available in the Agent Development Kit:

1. **SequentialAgent**: Executes sub-agents in sequence, passing output from one to the next
2. **ParallelAgent**: Executes sub-agents in parallel, with all agents receiving the same input
3. **LoopAgent**: Executes a sub-agent in a loop until a condition is met
4. **LangGraphAgent**: Implements a directed graph of agents for complex workflows

## Running the Example

To run this example:

```bash
# Navigate to the example directory
cd examples/specialized-agents

# Run the example
ts-node index.ts
```

## Example Breakdown

### Sequential Agent

The sequential agent executes agents one after another, with each agent's output becoming input to the next. This is useful for creating pipelines of operations, such as research followed by summarization.

```typescript
const sequentialAgent = new SequentialAgent({
  name: "research_pipeline",
  description: "Researches a topic and then summarizes it",
  agents: [researchAgent, summaryAgent]
});
```

### Parallel Agent

The parallel agent executes multiple agents simultaneously, each receiving the same input. Results are combined. This is useful for gathering multiple perspectives or performing different analyses on the same data.

```typescript
const parallelAgent = new ParallelAgent({
  name: "multi_perspective",
  description: "Provides multiple perspectives on a topic",
  agents: [weatherAgent, analyzerAgent]
});
```

### Loop Agent

The loop agent repeatedly executes a single agent until a condition is met or a maximum number of iterations is reached. This is useful for iterative refinement or repetitive tasks.

```typescript
const loopAgent = new LoopAgent({
  name: "iterative_drafter",
  description: "Drafts content through multiple iterations",
  agent: drafterAgent,
  maxIterations: 3
});
```

### LangGraph Agent

The LangGraph agent implements a directed graph of agents, where execution flows between agents based on predefined connections and conditions. This enables complex workflows with branching and merging paths.

```typescript
const nodes: LangGraphNode[] = [
  {
    name: 'start',
    agent: researchAgent,
    targets: ['analyze', 'summarize']
  },
  // More nodes...
];

const graphAgent = new LangGraphAgent({
  name: "complex_workflow",
  description: "Research, analyze, and summarize a topic with a final draft",
  nodes,
  rootNode: 'start'
});
```

## When to Use Each Type

- **SequentialAgent**: When you need to process information through distinct, ordered stages
- **ParallelAgent**: When you need to analyze the same information from multiple angles simultaneously
- **LoopAgent**: When you need to refine or iterate on something until it meets criteria
- **LangGraphAgent**: When you need a complex workflow with conditional branching 