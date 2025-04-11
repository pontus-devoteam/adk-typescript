[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BaseLLMConnection

# Class: `abstract` BaseLLMConnection

Defined in: [llm/BaseLLMConnection.ts:6](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L6)

Base class for LLM connections

## Extended by

- [`OpenAILLMConnection`](OpenAILLMConnection.md)
- [`AnthropicLLMConnection`](AnthropicLLMConnection.md)

## Constructors

### Constructor

> **new BaseLLMConnection**(): `BaseLLMConnection`

#### Returns

`BaseLLMConnection`

## Accessors

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [llm/BaseLLMConnection.ts:15](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L15)

Gets whether the connection is active

##### Returns

`boolean`

## Methods

### close()

> **close**(): `void`

Defined in: [llm/BaseLLMConnection.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L50)

Closes the connection

#### Returns

`void`

***

### onEnd()

> `abstract` **onEnd**(`callback`): `void`

Defined in: [llm/BaseLLMConnection.ts:45](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L45)

Handles the end of the connection

#### Parameters

##### callback

() => `void`

The callback to handle the end

#### Returns

`void`

***

### onError()

> `abstract` **onError**(`callback`): `void`

Defined in: [llm/BaseLLMConnection.ts:38](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L38)

Handles errors from the LLM

#### Parameters

##### callback

(`error`) => `void`

The callback to handle errors

#### Returns

`void`

***

### onResponse()

> `abstract` **onResponse**(`callback`): `void`

Defined in: [llm/BaseLLMConnection.ts:31](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L31)

Handles responses from the LLM

#### Parameters

##### callback

(`response`) => `void`

The callback to handle responses

#### Returns

`void`

***

### send()

> `abstract` **send**(`message`): `void`

Defined in: [llm/BaseLLMConnection.ts:24](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/llm/BaseLLMConnection.ts#L24)

Sends a message to the LLM

#### Parameters

##### message

`string`

The message to send

#### Returns

`void`
