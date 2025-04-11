[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / AnthropicLLMConnection

# Class: AnthropicLLMConnection

Defined in: [llm/providers/anthropic/AnthropicLLMConnection.ts:43](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLMConnection.ts#L43)

Anthropic LLM Connection for live chat with Claude models

## Extends

- [`BaseLLMConnection`](BaseLLMConnection.md)

## Constructors

### Constructor

> **new AnthropicLLMConnection**(`client`, `model`, `initialRequest`, `defaultParams`): `AnthropicLLMConnection`

Defined in: [llm/providers/anthropic/AnthropicLLMConnection.ts:79](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLMConnection.ts#L79)

Constructor

#### Parameters

##### client

`AxiosInstance`

##### model

`string`

##### initialRequest

[`LLMRequest`](LLMRequest.md)

##### defaultParams

`Record`\<`string`, `any`\>

#### Returns

`AnthropicLLMConnection`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`constructor`](BaseLLMConnection.md#constructor)

## Accessors

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [llm/BaseLLMConnection.ts:15](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/BaseLLMConnection.ts#L15)

Gets whether the connection is active

##### Returns

`boolean`

#### Inherited from

[`BaseLLMConnection`](BaseLLMConnection.md).[`isActive`](BaseLLMConnection.md#isactive)

## Methods

### close()

> **close**(): `void`

Defined in: [llm/BaseLLMConnection.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/BaseLLMConnection.ts#L50)

Closes the connection

#### Returns

`void`

#### Inherited from

[`BaseLLMConnection`](BaseLLMConnection.md).[`close`](BaseLLMConnection.md#close)

***

### onEnd()

> **onEnd**(`callback`): `void`

Defined in: [llm/providers/anthropic/AnthropicLLMConnection.ts:311](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLMConnection.ts#L311)

Handles the end of the connection
Implements BaseLLMConnection.onEnd

#### Parameters

##### callback

() => `void`

The callback to handle the end

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`onEnd`](BaseLLMConnection.md#onend)

***

### onError()

> **onError**(`callback`): `void`

Defined in: [llm/providers/anthropic/AnthropicLLMConnection.ts:301](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLMConnection.ts#L301)

Handles errors from the LLM
Implements BaseLLMConnection.onError

#### Parameters

##### callback

(`error`) => `void`

The callback to handle errors

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`onError`](BaseLLMConnection.md#onerror)

***

### onResponse()

> **onResponse**(`callback`): `void`

Defined in: [llm/providers/anthropic/AnthropicLLMConnection.ts:291](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLMConnection.ts#L291)

Handles responses from the LLM
Implements BaseLLMConnection.onResponse

#### Parameters

##### callback

(`response`) => `void`

The callback to handle responses

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`onResponse`](BaseLLMConnection.md#onresponse)

***

### send()

> **send**(`message`): `void`

Defined in: [llm/providers/anthropic/AnthropicLLMConnection.ts:245](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/llm/providers/anthropic/AnthropicLLMConnection.ts#L245)

Sends a message to the LLM
Implements BaseLLMConnection.send

#### Parameters

##### message

`string`

The message to send

#### Returns

`void`

#### Overrides

[`BaseLLMConnection`](BaseLLMConnection.md).[`send`](BaseLLMConnection.md#send)
