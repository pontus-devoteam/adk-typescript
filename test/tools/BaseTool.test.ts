import { BaseTool } from '../../src/tools/base/BaseTool';
import { FunctionDeclaration } from '../../src/models/request/FunctionDeclaration';
import { ToolContext } from '../../src/models/context/ToolContext';

// Define a concrete implementation of BaseTool for testing
class TestTool extends BaseTool {
  lastArgs: any = null;
  shouldFail: boolean = false;
  errorMessage: string = 'Test error message';
  
  constructor() {
    super({
      name: 'test_tool',
      description: 'A test tool for testing',
      isLongRunning: false,
      shouldRetryOnFailure: true,
      maxRetryAttempts: 3
    });
  }
  
  getDeclaration(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          testParam: {
            type: 'string',
            description: 'A test parameter'
          }
        },
        required: ['testParam']
      }
    };
  }
  
  async runAsync(args: any, context: ToolContext): Promise<any> {
    this.lastArgs = args;
    
    if (this.shouldFail) {
      throw new Error(this.errorMessage);
    }
    
    return { result: `Processed: ${args.testParam}` };
  }
}

describe('BaseTool', () => {
  let testTool: TestTool;
  
  beforeEach(() => {
    testTool = new TestTool();
    testTool.lastArgs = null;
    testTool.shouldFail = false;
    
    // Mock console.log and console.error for DEBUG tests
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });
  
  afterEach(() => {
    // Restore console mocks
    jest.restoreAllMocks();
  });
  
  it('should initialize with correct properties', () => {
    expect(testTool.name).toBe('test_tool');
    expect(testTool.description).toBe('A test tool for testing');
    expect(testTool.isLongRunning).toBe(false);
    expect(testTool.shouldRetryOnFailure).toBe(true);
    expect(testTool.maxRetryAttempts).toBe(3);
    expect(testTool.baseRetryDelay).toBe(1000);
    expect(testTool.maxRetryDelay).toBe(10000);
  });
  
  it('should return a valid function declaration', () => {
    const declaration = testTool.getDeclaration();
    
    expect(declaration.name).toBe('test_tool');
    expect(declaration.description).toBe('A test tool for testing');
    expect(declaration.parameters.type).toBe('object');
    expect(declaration.parameters.properties?.testParam.type).toBe('string');
    expect(declaration.parameters.required).toContain('testParam');
  });
  
  it('should execute runAsync successfully', async () => {
    const args = { testParam: 'test value' };
    const context = {} as ToolContext;
    
    const result = await testTool.runAsync(args, context);
    
    expect(testTool.lastArgs).toBe(args);
    expect(result).toEqual({ result: 'Processed: test value' });
  });
  
  it('should handle errors in runAsync', async () => {
    const args = { testParam: 'test value' };
    const context = {} as ToolContext;
    
    testTool.shouldFail = true;
    
    await expect(testTool.runAsync(args, context)).rejects.toThrow(
      testTool.errorMessage
    );
  });
  
  it('should validate arguments correctly', () => {
    const validArgs = { testParam: 'valid value' };
    const invalidArgs = { wrongParam: 'invalid value' };
    
    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error');
    
    // Test with valid args
    expect(testTool.validateArguments(validArgs)).toBe(true);
    expect(consoleSpy).not.toHaveBeenCalled();
    
    // Test with invalid args
    expect(testTool.validateArguments(invalidArgs)).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
  });
}); 