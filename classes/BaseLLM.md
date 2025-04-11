[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BaseLLM

# Class: `abstract` BaseLLM

Defined in: [llm/BaseLLM.ts:8](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/BaseLLM.ts#L8)

Base class for all LLM implementations

## Extended by

- [`OpenAILLM`](OpenAILLM.md)
- [`AnthropicLLM`](AnthropicLLM.md)
- [`GoogleLLM`](GoogleLLM.md)

## Constructors

### Constructor

> **new BaseLLM**(`model`): `BaseLLM`

Defined in: [llm/BaseLLM.ts:17](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/BaseLLM.ts#L17)

Constructor for BaseLLM

#### Parameters

##### model

`string`

#### Returns

`BaseLLM`

## Properties

### model

> **model**: `string`

Defined in: [llm/BaseLLM.ts:12](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/BaseLLM.ts#L12)

The name of the LLM model

## Methods

### connect()

> **connect**(`llmRequest`): [`BaseLLMConnection`](BaseLLMConnection.md)

Defined in: [llm/BaseLLM.ts:46](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/BaseLLM.ts#L46)

Creates a live connection to the LLM

#### Parameters

##### llmRequest

[`LLMRequest`](LLMRequest.md)

The request to send to the LLM

#### Returns

[`BaseLLMConnection`](BaseLLMConnection.md)

BaseLLMConnection, the connection to the LLM

***

### generateContentAsync()

> `abstract` **generateContentAsync**(`llmRequest`, `stream?`): `AsyncGenerator`\<[`LLMResponse`](LLMResponse.md), `void`, `unknown`\>

Defined in: [llm/BaseLLM.ts:35](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/BaseLLM.ts#L35)

Generates content from the given request

#### Parameters

##### llmRequest

[`LLMRequest`](LLMRequest.md)

The request to send to the LLM

##### stream?

`boolean`

Whether to do streaming call

#### Returns

`AsyncGenerator`\<[`LLMResponse`](LLMResponse.md), `void`, `unknown`\>

A generator of LLMResponses

***

### supportedModels()

> `static` **supportedModels**(): `string`[]

Defined in: [llm/BaseLLM.ts:24](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/BaseLLM.ts#L24)

Returns a list of supported models in regex for LLMRegistry

#### Returns

`string`[]
