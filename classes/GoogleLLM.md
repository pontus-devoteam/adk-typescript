[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / GoogleLLM

# Class: GoogleLLM

Defined in: [llm/providers/google/GoogleLLM.ts:44](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/google/GoogleLLM.ts#L44)

Google Gemini LLM implementation

## Extends

- [`BaseLLM`](BaseLLM.md)

## Constructors

### Constructor

> **new GoogleLLM**(`model`, `config?`): `GoogleLLM`

Defined in: [llm/providers/google/GoogleLLM.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/google/GoogleLLM.ts#L63)

Constructor for GoogleLLM

#### Parameters

##### model

`string`

##### config?

`GoogleLLMConfig`

#### Returns

`GoogleLLM`

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

Defined in: [llm/BaseLLM.ts:46](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/BaseLLM.ts#L46)

Creates a live connection to the LLM

#### Parameters

##### llmRequest

[`LLMRequest`](LLMRequest.md)

The request to send to the LLM

#### Returns

[`BaseLLMConnection`](BaseLLMConnection.md)

BaseLLMConnection, the connection to the LLM

#### Inherited from

[`BaseLLM`](BaseLLM.md).[`connect`](BaseLLM.md#connect)

***

### generateContentAsync()

> **generateContentAsync**(`llmRequest`, `stream`): `AsyncGenerator`\<[`LLMResponse`](LLMResponse.md), `void`, `unknown`\>

Defined in: [llm/providers/google/GoogleLLM.ts:217](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/google/GoogleLLM.ts#L217)

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

Defined in: [llm/providers/google/GoogleLLM.ts:91](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/google/GoogleLLM.ts#L91)

Returns a list of supported models in regex for LLMRegistry

#### Returns

`string`[]

#### Overrides

[`BaseLLM`](BaseLLM.md).[`supportedModels`](BaseLLM.md#supportedmodels)
