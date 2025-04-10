# Tool Usage Example

This example demonstrates how to create and use custom tools with the ADK TypeScript library, including how tools are executed in an agent loop.

## Features Demonstrated

1. Creating custom tools by extending the `BaseTool` class
2. Tool declaration with parameter schemas
3. Tool execution within the agent loop
4. Handling tool results and continuing the conversation

## Included Tools

1. **Calculator Tool**: Performs basic arithmetic operations
2. **Weather Tool**: Provides simulated weather data (mock implementation)

## Setup

1. Make sure you have installed the dependencies:

```bash
npm install
```

2. Copy the `.env.example` file at the root of the project to `.env` and add your API keys:

```bash
cp ../../.env.example ../../.env
```

3. Edit the `.env` file with your API keys:

```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Default model to use - uncomment the one you want to use
LLM_MODEL=gpt-4-turbo
# LLM_MODEL=claude-3-opus
# LLM_MODEL=gemini-1.5-pro
```

## Running the Example

To run the example, use:

```bash
npm run example:tool
```

or directly:

```bash
npx ts-node examples/tool-usage/index.ts
```

## How It Works

The example demonstrates the complete agent loop process:

1. The agent receives a user query that requires tool use
2. The LLM generates a response with tool calls
3. The ADK executes the specified tools with their arguments
4. Tool results are added back to the conversation
5. The LLM continues processing with the new information
6. This loop repeats until the LLM provides a final answer without tool calls

This process allows agents to perform complex tasks by breaking them down into smaller operations that tools can handle. 