/**
 * Agent Development Kit (ADK) for TypeScript
 * A framework for building AI agents with multi-provider LLM support
 */

// Agent Exports - Main entry point for most users
export { Agent } from './agents/specialized/Agent';
export type { AgentConfig } from './agents/specialized/Agent';

// Specialized Agents
export { SequentialAgent } from './agents/specialized/SequentialAgent';
export { ParallelAgent } from './agents/specialized/ParallelAgent';
export { LoopAgent } from './agents/specialized/LoopAgent';
export { LangGraphAgent } from './agents/specialized/LangGraphAgent';

// Base Classes - For extending the framework
export { BaseAgent } from './agents/base/BaseAgent';
export { BaseTool } from './tools/base/BaseTool';
export { BaseLLM } from './llm/BaseLLM';
export { BaseLLMConnection } from './llm/BaseLLMConnection';
export type { ToolConfig } from './tools/base/BaseTool';

// Core LLM Infrastructure
export { LLMRegistry } from './llm/registry/LLMRegistry';

// LLM Providers - Direct access to specific providers
export { OpenAILLM } from './llm/providers/openai/OpenAILLM';
export { AnthropicLLM } from './llm/providers/anthropic/AnthropicLLM';
export { GoogleLLM } from './llm/providers/google/GoogleLLM';

// LLM Connections
export { OpenAILLMConnection } from './llm/providers/openai/OpenAILLMConnection';
export { AnthropicLLMConnection } from './llm/providers/anthropic/AnthropicLLMConnection';

// Initialize providers - Automatically registers all LLMs
import './llm/registry/providers';

// Ready-to-use Tools
export { GoogleSearch } from './tools/common/GoogleSearch';
// Export additional common tools when available

// Request/Response Models
export { LLMRequest, Message, MessageRole, MessageContent } from './models/request/LLMRequest';
export { LLMResponse, FunctionCall, ToolCall } from './models/response/LLMResponse';
export { FunctionDeclaration, JSONSchema } from './models/request/FunctionDeclaration';

// Context Models - For advanced usage
export { InvocationContext } from './models/context/InvocationContext';
export { ToolContext } from './models/context/ToolContext';
export { RunConfig, StreamingMode } from './models/config/RunConfig';

// Auth System - For API authentication
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

// Memory System - For persistent conversations
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

// Namespaced exports for cleaner imports
export * as Agents from './agents';
export * as LLMs from './llm';
export * as Tools from './tools';
export * as Models from './models';
export * as Memory from './memory';

// Version
export const version = '0.1.0'; 