[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / OpenAILLM

# Class: OpenAILLM

Defined in: [llm/providers/openai/OpenAILLM.ts:61](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLM.ts#L61)

OpenAI LLM implementation

## Extends

- [`BaseLLM`](BaseLLM.md)

## Constructors

### Constructor

> **new OpenAILLM**(`model`, `config?`): `OpenAILLM`

Defined in: [llm/providers/openai/OpenAILLM.ts:75](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLM.ts#L75)

Constructor for OpenAILLM

#### Parameters

##### model

`string`

##### config?

`OpenAILLMConfig`

#### Returns

`OpenAILLM`

#### Overrides

[`BaseLLM`](BaseLLM.md).[`constructor`](BaseLLM.md#constructor)

## Properties

### model

> **model**: `string`

Defined in: [llm/BaseLLM.ts:12](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLM.ts#L12)

The name of the LLM model

#### Inherited from

[`BaseLLM`](BaseLLM.md).[`model`](BaseLLM.md#model)

## Methods

### connect()

> **connect**(`llmRequest`): [`BaseLLMConnection`](BaseLLMConnection.md)

Defined in: [llm/providers/openai/OpenAILLM.ts:379](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLM.ts#L379)

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

Defined in: [llm/providers/openai/OpenAILLM.ts:278](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLM.ts#L278)

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

Defined in: [llm/providers/openai/OpenAILLM.ts:98](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLM.ts#L98)

Returns a list of supported models in regex for LLMRegistry

#### Returns

`string`[]

#### Overrides

[`BaseLLM`](BaseLLM.md).[`supportedModels`](BaseLLM.md#supportedmodels)
