import { Agent } from '../../src/agents/specialized/Agent';
import { LLMResponse } from '../../src/models/response/LLMResponse';
import { BaseTool } from '../../src/tools/base/BaseTool';
import { FunctionDeclaration } from '../../src/models/request/FunctionDeclaration';
import { ToolContext } from '../../src/models/context/ToolContext';
import { LLMRegistry } from '../../src/llm/registry/LLMRegistry';
import { OpenAILLM } from '../../src/llm/providers/openai/OpenAILLM';

// Mock these modules first
jest.mock('../../src/llm/providers/openai/OpenAILLM');
jest.mock('../../src/llm/registry/LLMRegistry');

// Create mock implementation after mocking
const mockGenerateContent = jest.fn().mockImplementation(async function* () {
  yield new LLMResponse({
    role: 'assistant',
    content: 'This is a mock response'
  });
});

// Setup mocks
beforeAll(() => {
  // Mock OpenAILLM implementation
  (OpenAILLM as jest.MockedClass<typeof OpenAILLM>).mockImplementation((model: string) => {
    return {
      model,
      generateContentAsync: mockGenerateContent,
      supportedModels: () => ['gpt-3.5-turbo', 'gpt-4']
    } as any;
  });

  // Setup LLMRegistry mock
  (LLMRegistry.resolve as jest.Mock).mockImplementation((model: string) => {
    if (model === 'gpt-3.5-turbo' || model === 'gpt-4') {
      return OpenAILLM;
    }
    return null;
  });

  (LLMRegistry.newLLM as jest.Mock).mockImplementation((model: string) => {
    return new OpenAILLM(model);
  });
});

// Mock Tool for testing
class MockTool extends BaseTool {
  constructor() {
    super({
      name: 'mock_tool',
      description: 'A mock tool for testing'
    });
  }

  getDeclaration(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: 'Input for the tool'
          }
        },
        required: ['input']
      }
    };
  }

  async runAsync(args: { input: string }, _context: ToolContext): Promise<any> {
    return { result: `Processed: ${args.input}` };
  }
}

describe('Agent Class', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default configuration', () => {
    const agent = new Agent({
      name: 'test_agent',
      model: 'gpt-3.5-turbo',
      description: 'A test agent'
    });

    expect(agent).toBeDefined();
    expect(agent).toBeInstanceOf(Agent);
  });

  it('should initialize with tools', () => {
    const mockTool = new MockTool();
    const agent = new Agent({
      name: 'test_agent',
      model: 'gpt-3.5-turbo',
      description: 'A test agent with tools',
      tools: [mockTool]
    });

    expect(agent).toBeDefined();
    expect(agent).toBeInstanceOf(Agent);
  });

  it('should run and return a response', async () => {
    const agent = new Agent({
      name: 'test_agent',
      model: 'gpt-3.5-turbo',
      description: 'A test agent'
    });

    const response = await agent.run({
      messages: [{ role: 'user', content: 'Hello, agent!' }]
    });

    expect(response).toBeDefined();
    expect(response.role).toBe('assistant');
    expect(response.content).toBe('This is a mock response');
  });

  it('should apply instructions when provided', async () => {
    const agent = new Agent({
      name: 'test_agent',
      model: 'gpt-3.5-turbo',
      description: 'A test agent',
      instructions: 'You are a helpful assistant.'
    });

    const response = await agent.run({
      messages: [{ role: 'user', content: 'Hello, agent!' }]
    });

    expect(response).toBeDefined();
    expect(response.content).toBe('This is a mock response');
  });

  // Additional test cases would follow:
  // - Tool execution tests
  // - Streaming response tests
  // - Memory integration tests
  // - Error handling tests
}); 