import { LLMRequest, Message, MessageRole, MessageContent, LLMRequestConfig, TextContent, ImageContent } from '../../src/models/request/LLMRequest';
import { RunConfig } from '../../src/models/config/RunConfig';

describe('LLMRequest', () => {
  it('should initialize with simple messages', () => {
    const messages: Message[] = [
      { role: 'user', content: 'Hello, world!' }
    ];
    
    const request = new LLMRequest({ messages });
    
    expect(request.messages).toEqual(messages);
    expect(request.config).toBeDefined();
  });

  it('should initialize with messages and config', () => {
    const messages: Message[] = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello, world!' }
    ];
    
    const config: LLMRequestConfig = {
      temperature: 0.7,
      max_tokens: 100
    };
    
    const request = new LLMRequest({ messages, config });
    
    expect(request.messages).toEqual(messages);
    expect(request.config).toEqual(config);
  });

  it('should handle empty messages array', () => {
    const request = new LLMRequest({ messages: [] });
    
    expect(request.messages).toEqual([]);
    expect(request.config).toBeDefined();
  });

  it('should handle multimodal content', () => {
    const textContent: TextContent = { type: 'text', text: 'What is this image?' };
    const imageContent: ImageContent = { 
      type: 'image', 
      image_url: { url: 'https://example.com/image.jpg' } 
    };
    
    const messages: Message[] = [
      {
        role: 'user',
        content: [textContent, imageContent]
      }
    ];
    
    const request = new LLMRequest({ messages });
    
    expect(request.messages).toEqual(messages);
    expect(Array.isArray(request.messages[0].content)).toBe(true);
    
    const content = request.messages[0].content as Array<TextContent | ImageContent>;
    expect(content[0].type).toBe('text');
    expect(content[1].type).toBe('image');
  });

  it('should handle functions in config', () => {
    const messages: Message[] = [
      { role: 'user', content: 'What is the weather in Paris?' }
    ];
    
    const config: LLMRequestConfig = {
      functions: [
        {
          name: 'get_weather',
          description: 'Get the weather for a location',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: 'The city and state or country'
              }
            },
            required: ['location']
          }
        }
      ]
    };
    
    const request = new LLMRequest({ messages, config });
    
    expect(request.config.functions).toBeDefined();
    expect(request.config.functions?.length).toBe(1);
    expect(request.config.functions?.[0].name).toBe('get_weather');
  });

  it('should set default config if not provided', () => {
    const messages: Message[] = [
      { role: 'user', content: 'Hello' }
    ];
    
    const request = new LLMRequest({ messages });
    
    expect(request.config).toEqual({});
  });

  it('should support all message roles', () => {
    const roles: MessageRole[] = ['user', 'assistant', 'system', 'function', 'tool'];
    
    for (const role of roles) {
      const message: Message = { 
        role, 
        content: `I am a ${role} message` 
      };
      
      const request = new LLMRequest({ messages: [message] });
      expect(request.messages[0].role).toBe(role);
    }
  });
}); 