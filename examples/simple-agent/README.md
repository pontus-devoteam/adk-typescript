# Simple Agent Example

This example demonstrates the basic usage of an agent with the ADK TypeScript library.

## Setup

1. First, make sure you have installed the dependencies:

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
npm run example:simple
```

or directly:

```bash
npx ts-node examples/simple-agent/index.ts
```

## What It Demonstrates

This example demonstrates:

1. Creating a simple agent with a specified LLM model
2. Adding a tool to the agent (GoogleSearch)
3. Running the agent with a question
4. Using streaming mode to get real-time responses

The example first runs a simple query without streaming, then runs a second query with streaming enabled to show the difference. 