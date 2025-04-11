import { Agent, BaseTool, Message, MessageRole } from '../../src';
import { FunctionDeclaration } from '../../src/models/request/FunctionDeclaration';
import { ToolContext } from '../../src/models/context/ToolContext';
import { OpenAILLM } from '../../src/llm/providers/openai/OpenAILLM';
import { LLMRegistry } from '../../src/llm/registry/LLMRegistry';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Register the OpenAI LLM
LLMRegistry.registerLLM(OpenAILLM);

// Enable debug mode for showing agent loop
const DEBUG = true;

/**
 * Custom Calculator Tool
 */
class CalculatorTool extends BaseTool {
  constructor() {
    super({
      name: 'calculator',
      description: 'Perform basic arithmetic calculations'
    });
  }

  getDeclaration(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'The operation to perform: add, subtract, multiply, divide',
            enum: ['add', 'subtract', 'multiply', 'divide']
          },
          a: {
            type: 'number',
            description: 'First operand'
          },
          b: {
            type: 'number',
            description: 'Second operand'
          }
        },
        required: ['operation', 'a', 'b']
      }
    };
  }

  async runAsync(args: {
    operation: string;
    a: number;
    b: number;
  }, _context: ToolContext): Promise<any> {
    console.log(`Calculating: ${args.a} ${args.operation} ${args.b}`);
    
    switch(args.operation) {
      case 'add':
        return { result: args.a + args.b };
      case 'subtract':
        return { result: args.a - args.b };
      case 'multiply':
        return { result: args.a * args.b };
      case 'divide':
        if (args.b === 0) {
          throw new Error('Division by zero is not allowed');
        }
        return { result: args.a / args.b };
      default:
        throw new Error(`Unknown operation: ${args.operation}`);
    }
  }
}

/**
 * Weather Tool (Mock Implementation)
 */
class WeatherTool extends BaseTool {
  constructor() {
    super({
      name: 'weather',
      description: 'Get the current weather for a location'
    });
  }

  getDeclaration(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city or location to get weather for'
          }
        },
        required: ['location']
      }
    };
  }

  async runAsync(args: {
    location: string;
  }, _context: ToolContext): Promise<any> {
    console.log(`Getting weather for: ${args.location}`);
    
    // Mock implementation - would be replaced with an actual API call
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy'];
    const randomTemp = Math.floor(Math.random() * 35) + 0; // 0-35°C
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: args.location,
      temperature: `${randomTemp}°C`,
      condition: randomCondition,
      humidity: `${Math.floor(Math.random() * 100)}%`,
      updated: new Date().toISOString()
    };
  }
}

/**
 * Demonstrates the Agent loop with tool execution
 */
async function main() {
  try {
    // Create the agent with custom tools
    const agent = new Agent({
      name: "tool_assistant",
      model: process.env.LLM_MODEL || "gpt-4-turbo",
      description: "An assistant that demonstrates tool usage",
      instructions: "You are a helpful assistant that can perform calculations and check the weather. Use the appropriate tools when asked about math or weather.",
      tools: [
        new CalculatorTool(),
        new WeatherTool()
      ],
      maxToolExecutionSteps: 5 // Limit the tool execution steps
    });

    console.log("Agent initialized with custom tools");
    console.log("-----------------------------------");

    if (DEBUG) {
      // Add debug wrapper for agent.run
      const originalRun = agent.run.bind(agent);
      agent.run = async (options) => {
        console.log("\n[DEBUG] Starting agent loop with query:", options.messages[options.messages.length-1].content);
        const result = await originalRun(options);
        console.log("[DEBUG] Agent loop completed");
        return result;
      };
    }

    // Example 1: Calculator tool usage
    console.log("\nExample 1: Calculator Tool");
    console.log("Question: What is 24 multiplied by 7?");
    console.log("-----------------------------------");
    
    const calcResponse = await agent.run({
      messages: [
        { role: 'user' as MessageRole, content: 'What is 24 multiplied by 7?' }
      ]
    });

    console.log("Final Response:", calcResponse.content);
    console.log("-----------------------------------");

    // Example 2: Weather tool usage
    console.log("\nExample 2: Weather Tool");
    console.log("Question: What's the weather like in Stockholm today?");
    console.log("-----------------------------------");
    
    const weatherResponse = await agent.run({
      messages: [
        { role: 'user' as MessageRole, content: 'What\'s the weather like in Stockholm today?' }
      ]
    });

    console.log("Final Response:", weatherResponse.content);
    console.log("-----------------------------------");

    // Example 3: Multi-tool conversation
    console.log("\nExample 3: Multi-tool conversation");
    console.log("Question: I need to know the weather in Paris and then calculate how many euros I need if I spend 25 euros per day for 7 days.");
    console.log("-----------------------------------");
    
    const multiToolResponse = await agent.run({
      messages: [
        { role: 'user' as MessageRole, content: 'I need to know the weather in Paris and then calculate how many euros I need if I spend 25 euros per day for 7 days.' }
      ]
    });

    console.log("Final Response:", multiToolResponse.content);
    console.log("-----------------------------------");

    // Example 4: Multi-turn conversation with tool use
    console.log("\nExample 4: Multi-turn conversation");
    console.log("-----------------------------------");
    
    const conversation: Message[] = [
      { role: 'user' as MessageRole, content: 'Hi, I\'m planning a trip to New York. What\'s the weather like there?' }
    ];
    
    // First turn
    let response = await agent.run({ messages: [...conversation] });
    console.log("User: Hi, I'm planning a trip to New York. What's the weather like there?");
    console.log("Assistant:", response.content);
    
    // Add response to conversation
    conversation.push({ role: 'assistant', content: response.content || '' });
    
    // Second turn
    conversation.push({ role: 'user', content: 'Great! If I stay for 5 days and hotels cost $200 per night, how much will I spend on accommodation?' });
    console.log("\nUser: Great! If I stay for 5 days and hotels cost $200 per night, how much will I spend on accommodation?");
    
    response = await agent.run({ messages: [...conversation] });
    console.log("Assistant:", response.content);
    
    // Add response to conversation
    conversation.push({ role: 'assistant', content: response.content || '' });
    
    // Third turn
    conversation.push({ role: 'user', content: 'And what will the total be if I also spend $100 per day on food and activities?' });
    console.log("\nUser: And what will the total be if I also spend $100 per day on food and activities?");
    
    response = await agent.run({ messages: [...conversation] });
    console.log("Assistant:", response.content);
    
    console.log("\nTool usage examples complete!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
main().catch(error => {
  console.error("Error:", error);
}); 