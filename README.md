<div align="center">
  <img src="adk-typescript.jpg" alt="ADK TypeScript Logo" width="100%"/>

  <p align="center">
    A robust framework for building AI agents with multi-provider LLM support
  </p>

  <p align="center">
    <a href="https://www.npmjs.com/package/@pontus-devoteam/adk">
      <img src="https://img.shields.io/npm/v/@pontus-devoteam/adk" alt="npm version" />
    </a>
    <a href="https://www.npmjs.com/package/@pontus-devoteam/adk">
      <img src="https://img.shields.io/npm/dm/@pontus-devoteam/adk" alt="npm downloads" />
    </a>
    <a href="https://github.com/pontus-devoteam/adk-typescript/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@pontus-devoteam/adk" alt="license" />
    </a>
    <a href="https://github.com/pontus-devoteam/adk-typescript">
      <img src="https://img.shields.io/github/stars/pontus-devoteam/adk-typescript?style=social" alt="github stars" />
    </a>
  </p>
</div>

## 🚀 Features

- **🤖 Multi-provider Support**: Seamlessly switch between OpenAI, Anthropic, or Google LLMs
- **🛠️ Tool System**: Create and use custom tools with declarative schemas
- **🔄 Agent Loop**: Complete implementation of the agent reasoning loop with tool execution
- **📡 Streaming Support**: Real-time streaming responses from LLMs
- **🔒 Authentication**: Flexible auth system for secure API access
- **💾 Memory Systems**: Persistent memory capabilities for stateful agents

## 🏗️ Project Status

⚠️ **Early Development Stage**

This project is currently in early development and should be considered alpha software. While it's functional and can be used in projects, you may encounter:

- Breaking changes between versions
- APIs that may evolve based on user feedback
- Features that are still being stabilized
- Documentation that is being expanded

Current development status:
- ✅ Core agent framework
- ✅ Basic OpenAI implementation
- ✅ Initial Anthropic integration
- ✅ Initial Google/Gemini integration
- ✅ Tool system foundation
- ✅ Basic memory system
- 🚧 Enhanced error handling
- 🚧 Improved type safety
- 🚧 Extended provider features
- 🚧 Advanced memory capabilities
- ⬜ Comprehensive testing suite
- ⬜ Performance optimizations
- ⬜ Advanced streaming features

We welcome feedback, bug reports, and contributions! Please check the [issues page](https://github.com/pontus-devoteam/adk-typescript/issues) for known issues or to report new ones.

## 📦 Installation

```bash
# Using npm
npm install @pontus-devoteam/adk

# Using yarn
yarn add @pontus-devoteam/adk

# Using pnpm
pnpm add @pontus-devoteam/adk
```

## 🔑 Environment Setup

Create a `.env` file in your project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

## 📚 Usage

### Basic Agent

```typescript
import { Agent } from '@pontus-devoteam/adk';

const agent = new Agent({
  name: "simple_assistant",
  model: "gpt-4-turbo", // Or "claude-3-opus" or "gemini-1.5-pro"
  description: "A simple assistant",
  instructions: "You are a helpful assistant. Answer questions concisely."
});

const response = await agent.run({
  messages: [{ role: 'user', content: 'Hello, who are you?' }]
});

console.log(response.content);
```

### Agent with Tools

```typescript
import { Agent, BaseTool } from '@pontus-devoteam/adk';
import { FunctionDeclaration } from '@pontus-devoteam/adk/models/request/FunctionDeclaration';
import { ToolContext } from '@pontus-devoteam/adk/models/context/ToolContext';

// Create a custom tool
class CalculatorTool extends BaseTool {
  constructor() {
    super({
      name: 'calculator',
      description: 'Perform basic calculations'
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
            enum: ['add', 'subtract', 'multiply', 'divide']
          },
          a: { type: 'number' },
          b: { type: 'number' }
        },
        required: ['operation', 'a', 'b']
      }
    };
  }

  async runAsync(args: any, _context: ToolContext): Promise<any> {
    const { operation, a, b } = args;
    
    switch(operation) {
      case 'add': return { result: a + b };
      case 'subtract': return { result: a - b };
      case 'multiply': return { result: a * b };
      case 'divide': return { result: a / b };
      default: throw new Error(`Unknown operation: ${operation}`);
    }
  }
}

// Create an agent with the tool
const agent = new Agent({
  name: "calculator_assistant",
  model: "gpt-4-turbo",
  instructions: "You can perform calculations. Use the calculator tool when asked about math.",
  tools: [new CalculatorTool()]
});

// Run the agent
const response = await agent.run({
  messages: [{ role: 'user', content: 'What is 24 * 7?' }]
});

console.log(response.content);
```

### Agent with Memory

```typescript
import { Agent, PersistentMemoryService } from '@pontus-devoteam/adk';
import path from 'path';

// Create a memory service
const memoryService = new PersistentMemoryService({
  storageDir: path.join(__dirname, '.memory'),
  createDir: true
});

// Create an agent with memory
const agent = new Agent({
  name: "memory_assistant",
  model: "gpt-3.5-turbo",
  instructions: "You have persistent memory. Remember user preferences.",
  memoryService,
  userId: 'user-123'
});

// Run the agent with a session ID for persistence
const response = await agent.run({
  messages: [{ role: 'user', content: 'Remember that I like blue.' }],
  sessionId: 'persistent-session-1'
});

console.log(response.content);
```

## 🧪 Examples

The `examples/` directory contains several example implementations:

- **🤖 Simple Agent**: Basic assistant with conversation
- **🛠️ Tool Usage**: Agent that uses tools to accomplish tasks
- **💾 Memory Usage**: Agent with persistent memory across runs
- **🔄 Multi-provider**: Switch between different LLM providers
- **🔒 Auth-secured**: Example with secure authentication

To run examples:

```bash
# Simple agent
npm run example:simple

# Tool usage
npm run example:tool

# Memory usage
npm run example:memory
```

## 🛠️ Development

```bash
# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show your support

Give a ⭐️ if this project helped you! 