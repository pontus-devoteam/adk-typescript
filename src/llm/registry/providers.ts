import { LLMRegistry } from './LLMRegistry';
import { OpenAILLM } from '../providers/openai/OpenAILLM';
import { AnthropicLLM } from '../providers/anthropic/AnthropicLLM';
import { GoogleLLM } from '../providers/google/GoogleLLM';

/**
 * Register all LLM providers
 */
export function registerProviders(): void {
  // Register OpenAI models
  LLMRegistry.registerLLM(OpenAILLM);
  
  // Register Anthropic models
  LLMRegistry.registerLLM(AnthropicLLM);
  
  // Register Google models
  LLMRegistry.registerLLM(GoogleLLM);
}

// Auto-register all providers
registerProviders(); 