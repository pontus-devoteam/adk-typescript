[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / OpenAILLMConnection

# Class: OpenAILLMConnection

Defined in: [llm/providers/openai/OpenAILLMConnection.ts:9](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLMConnection.ts#L9)

OpenAI LLM Connection

## Extends

- [`BaseLLMConnection`](BaseLLMConnection.md)

## Constructors

### Constructor

> **new OpenAILLMConnection**(`client`, `model`, `initialRequest`, `defaultParams`): `OpenAILLMConnection`

Defined in: [llm/providers/openai/OpenAILLMConnection.ts:53](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLMConnection.ts#L53)

Constructor for OpenAILLMConnection

#### Parameters

##### client

`OpenAI`

##### model

`string`

##### initialRequest

[`LLMRequest`](LLMRequest.md)

##### defaultParams

`Record`\<`string`, `any`\>

#### Returns

`OpenAILLMConnection`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`constructor`](BaseLLMConnection.md#constructor)

## Accessors

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [llm/BaseLLMConnection.ts:15](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L15)

Gets whether the connection is active

##### Returns

`boolean`

#### Inherited from

[`BaseLLMConnection`](BaseLLMConnection.md).[`isActive`](BaseLLMConnection.md#isactive)

## Methods

### close()

> **close**(): `void`

Defined in: [llm/BaseLLMConnection.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L50)

Closes the connection

#### Returns

`void`

#### Inherited from

[`BaseLLMConnection`](BaseLLMConnection.md).[`close`](BaseLLMConnection.md#close)

***

### onEnd()

> **onEnd**(`callback`): `void`

Defined in: [llm/providers/openai/OpenAILLMConnection.ts:318](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLMConnection.ts#L318)

Registers an end handler

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`onEnd`](BaseLLMConnection.md#onend)

***

### onError()

> **onError**(`callback`): `void`

Defined in: [llm/providers/openai/OpenAILLMConnection.ts:311](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLMConnection.ts#L311)

Registers an error handler

#### Parameters

##### callback

(`error`) => `void`

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`onError`](BaseLLMConnection.md#onerror)

***

### onResponse()

> **onResponse**(`callback`): `void`

Defined in: [llm/providers/openai/OpenAILLMConnection.ts:304](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLMConnection.ts#L304)

Registers a response handler

#### Parameters

##### callback

(`response`) => `void`

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`onResponse`](BaseLLMConnection.md#onresponse)

***

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: [llm/providers/openai/OpenAILLMConnection.ts:117](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/providers/openai/OpenAILLMConnection.ts#L117)

Sends a message to the OpenAI model

#### Parameters

##### message

`string`

#### Returns

`Promise`\<`void`\>

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`send`](BaseLLMConnection.md#send)
