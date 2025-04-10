import { Agent, LLMRequest, Message, MessageRole, RunConfig } from '@pontus-devoteam/adk';
import dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

// Initialize the agent with OpenAI's gpt-3.5-turbo model
const agent = new Agent({
  name: "openai_assistant",
  model: "gpt-3.5-turbo", // This will use the LLMRegistry to get the right provider
  description: "A simple assistant using OpenAI's gpt-3.5-turbo",
  instructions: "You are a helpful assistant. Answer questions concisely and accurately."
});

async function main() {
  try {
    console.log("🤖 Starting a simple agent example with OpenAI's gpt-3.5-turbo...");
    
    // Example 1: Basic question answering
    console.log("\n📝 Example 1: Basic question answering");
    const response1 = await agent.run({
      messages: [{ role: 'user' as MessageRole, content: "What are the three laws of robotics?" }]
    });
    console.log(`🤖 ${response1.content || 'No response content'}`);
    
    // Example 2: Follow-up question (using conversation history)
    console.log("\n📝 Example 2: Follow-up question");
    const response2 = await agent.run({
      messages: [
        { role: 'user' as MessageRole, content: "What are the three laws of robotics?" },
        { role: 'assistant' as MessageRole, content: response1.content || 'No response' },
        { role: 'user' as MessageRole, content: "Who formulated these laws?" }
      ]
    });
    console.log(`🤖 ${response2.content || 'No response content'}`);
    
    // Example 3: More complex reasoning
    console.log("\n📝 Example 3: More complex reasoning");
    const response3 = await agent.run({
      messages: [
        { role: 'user' as MessageRole, content: "What are the three laws of robotics?" },
        { role: 'assistant' as MessageRole, content: response1.content || 'No response' },
        { role: 'user' as MessageRole, content: "Who formulated these laws?" },
        { role: 'assistant' as MessageRole, content: response2.content || 'No response' },
        { role: 'user' as MessageRole, content: "Can you suggest three practical applications of these laws in modern AI systems?" }
      ]
    });
    console.log(`🤖 ${response3.content || 'No response content'}`);
    
    console.log("\n✅ Example completed successfully!");
  } catch (error) {
    console.error("❌ Error in agent example:", error);
  }
}

// Run the example
main(); 