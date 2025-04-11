[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / AnthropicLLM

# Class: AnthropicLLM

Defined in: [llm/providers/anthropic/AnthropicLLM.ts:101](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLM.ts#L101)

Anthropic LLM implementation for Claude models
Uses direct API calls instead of the SDK for better control

## Extends

- [`BaseLLM`](BaseLLM.md)

## Constructors

### Constructor

> **new AnthropicLLM**(`model`, `config?`): `AnthropicLLM`

Defined in: [llm/providers/anthropic/AnthropicLLM.ts:120](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLM.ts#L120)

Constructor for AnthropicLLM

#### Parameters

##### model

`string`

##### config?

`AnthropicLLMConfig`

#### Returns

`AnthropicLLM`

#### Overrides

[`BaseLLM`](BaseLLM.md).[`constructor`](BaseLLM.md#constructor)

## Properties

### model

> **model**: `string`

Defined in: [llm/BaseLLM.ts:12](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/BaseLLM.ts#L12)

The name of the LLM model

#### Inherited from

[`BaseLLM`](BaseLLM.md).[`model`](BaseLLM.md#model)

## Methods

### connect()

> **connect**(`llmRequest`): [`BaseLLMConnection`](BaseLLMConnection.md)

Defined in: [llm/providers/anthropic/AnthropicLLM.ts:442](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLM.ts#L442)

Creates a live connection to the LLM

#### Parameters

##### llmRequest

[`LLMRequest`](LLMRequest.md)

#### Returns

[`BaseLLMConnection`](BaseLLMConnection.md)

#### Overrides

[`BaseLLM`](BaseLLM.md).[`connect`](BaseLLM.md#connect)

***

### generateContentAsync()

> **generateContentAsync**(`llmRequest`, `stream`): `AsyncGenerator`\<[`LLMResponse`](LLMResponse.md), `void`, `unknown`\>

Defined in: [llm/providers/anthropic/AnthropicLLM.ts:344](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLM.ts#L344)

Generates content from the given request

#### Parameters

##### llmRequest

[`LLMRequest`](LLMRequest.md)

##### stream

`boolean` = `false`

#### Returns

`AsyncGenerator`\<[`LLMResponse`](LLMResponse.md), `void`, `unknown`\>

#### Overrides

[`BaseLLM`](BaseLLM.md).[`generateContentAsync`](BaseLLM.md#generatecontentasync)

***

### supportedModels()

> `static` **supportedModels**(): `string`[]

Defined in: [llm/providers/anthropic/AnthropicLLM.ts:142](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLM.ts#L142)

Returns a list of supported models in regex for LLMRegistry

#### Returns

`string`[]

#### Overrides

[`BaseLLM`](BaseLLM.md).[`supportedModels`](BaseLLM.md#supportedmodels)
