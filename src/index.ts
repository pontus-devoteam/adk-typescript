// Export agents
export { BaseAgent } from './agents/base/BaseAgent';
export { Agent } from './agents/specialized/Agent';
// More specialized agents would be added here

// Export LLM infrastructure
export { BaseLLM } from './llm/BaseLLM';
export { BaseLLMConnection } from './llm/BaseLLMConnection';
export { LLMRegistry } from './llm/registry/LLMRegistry';

// Initialize providers
import './llm/registry/providers';

// Export tools
export { BaseTool } from './tools/base/BaseTool';
export * as tools from './tools';

// Export models
export { LLMRequest, Message, MessageRole, MessageContent } from './models/request/LLMRequest';
export { LLMResponse, FunctionCall, ToolCall } from './models/response/LLMResponse';
export { FunctionDeclaration, JSONSchema } from './models/request/FunctionDeclaration';
export { InvocationContext } from './models/context/InvocationContext';
export { ToolContext } from './models/context/ToolContext';
export { RunConfig, StreamingMode } from './models/config/RunConfig';

// Export auth
export { AuthConfig } from './models/auth/AuthConfig';
export { 
  AuthCredential, 
  AuthCredentialType,
  ApiKeyCredential,
  BasicAuthCredential,
  BearerTokenCredential,
  OAuth2Credential
} from './models/auth/AuthCredential';
export {
  AuthScheme,
  AuthSchemeType,
  ApiKeyScheme,
  HttpScheme,
  OAuth2Scheme,
  OpenIdConnectScheme
} from './models/auth/AuthScheme';
export { AuthHandler } from './models/auth/AuthHandler';

// Export memory services
export {
  Session,
  SessionState,
  ListSessionOptions,
  BaseMemoryService,
  MemoryResult,
  SearchMemoryResponse,
  SearchMemoryOptions
} from './memory';

export {
  InMemoryMemoryService,
  PersistentMemoryService,
  SessionService,
  InMemorySessionService
} from './memory';

// Version
export const version = '0.1.0'; 