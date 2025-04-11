# Anthropic Claude Tool Calling Example

This example demonstrates how to use Anthropic's Claude 3 models with native tool calling capabilities.

## Features

- Native tool calling with Claude 3 models
- Weather tool implementation
- Basic query example
- Multi-turn conversation example
- Error handling

## Prerequisites

- Node.js 16+
- An Anthropic API key

## Setup

1. Make sure you have an Anthropic API key. If you don't have one, you can get it from the [Anthropic Console](https://console.anthropic.com/)

2. Set up your environment variables:
   - Create a `.env` file in the root directory or set the environment variable directly
   - Add your Anthropic API key: `ANTHROPIC_API_KEY=your_key_here`

## Running the Example

```bash
# From the project root
npm run build
npm run example:anthropic
```

## How It Works

This example showcases native tool calling with Claude 3 models:

1. Uses Claude 3 Sonnet which fully supports tool calling
2. Registers a weather tool with the Agent framework
3. Demonstrates both single-turn and multi-turn tool usage
4. Shows structured responses from the tool

The example uses the latest Anthropic TypeScript SDK which provides proper TypeScript type definitions and native support for all Claude 3 features, including:

- Tool calling
- Multimodal inputs
- Streaming responses
- Function calling

## Models

This example works best with Claude models that support tool calling:
- claude-3-opus
- claude-3-sonnet
- claude-3-haiku
- claude-3-5-sonnet-20240620 