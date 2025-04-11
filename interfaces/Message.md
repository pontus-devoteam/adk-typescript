[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / Message

# Interface: Message

Defined in: [models/request/LLMRequest.ts:35](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L35)

Represents a message in the conversation

## Properties

### content

> **content**: [`MessageContent`](../type-aliases/MessageContent.md)

Defined in: [models/request/LLMRequest.ts:37](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L37)

***

### function\_call?

> `optional` **function\_call**: `object`

Defined in: [models/request/LLMRequest.ts:39](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L39)

#### arguments

> **arguments**: `string`

#### name

> **name**: `string`

***

### name?

> `optional` **name**: `string`

Defined in: [models/request/LLMRequest.ts:38](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L38)

***

### role

> **role**: [`MessageRole`](../type-aliases/MessageRole.md)

Defined in: [models/request/LLMRequest.ts:36](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L36)

***

### tool\_call\_id?

> `optional` **tool\_call\_id**: `string`

Defined in: [models/request/LLMRequest.ts:44](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L44)

***

### tool\_calls?

> `optional` **tool\_calls**: [`ToolCall`](ToolCall.md)[]

Defined in: [models/request/LLMRequest.ts:43](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/request/LLMRequest.ts#L43)
