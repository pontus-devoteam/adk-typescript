[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / LLMResponse

# Class: LLMResponse

Defined in: [models/response/LLMResponse.ts:36](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L36)

Response from an LLM

## Constructors

### Constructor

> **new LLMResponse**(`data`): `LLMResponse`

Defined in: [models/response/LLMResponse.ts:67](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L67)

#### Parameters

##### data

###### content?

`null` \| `string`

###### function_call?

[`FunctionCall`](../interfaces/FunctionCall.md)

###### is_partial?

`boolean`

###### raw_response?

`any`

###### role?

`string`

###### tool_calls?

[`ToolCall`](../interfaces/ToolCall.md)[]

#### Returns

`LLMResponse`

## Properties

### content?

> `optional` **content**: `null` \| `string`

Defined in: [models/response/LLMResponse.ts:40](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L40)

Content of the response

***

### function\_call?

> `optional` **function\_call**: [`FunctionCall`](../interfaces/FunctionCall.md)

Defined in: [models/response/LLMResponse.ts:45](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L45)

Function calls in the response

***

### is\_partial?

> `optional` **is\_partial**: `boolean`

Defined in: [models/response/LLMResponse.ts:60](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L60)

Whether this is a partial response in a stream

***

### raw\_response?

> `optional` **raw\_response**: `any`

Defined in: [models/response/LLMResponse.ts:65](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L65)

Raw provider response

***

### role

> **role**: `string`

Defined in: [models/response/LLMResponse.ts:55](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L55)

Role of the message (usually 'assistant')

***

### tool\_calls?

> `optional` **tool\_calls**: [`ToolCall`](../interfaces/ToolCall.md)[]

Defined in: [models/response/LLMResponse.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/response/LLMResponse.ts#L50)

Tool calls in the response
