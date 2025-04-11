[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / InvocationContext

# Class: InvocationContext

Defined in: [models/context/InvocationContext.ts:10](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L10)

Contextual data for a specific agent invocation

## Constructors

### Constructor

> **new InvocationContext**(`options`): `InvocationContext`

Defined in: [models/context/InvocationContext.ts:64](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L64)

Constructor for InvocationContext

#### Parameters

##### options

###### appName?

`string`

###### config?

[`RunConfig`](RunConfig.md)

###### memoryService?

[`BaseMemoryService`](../interfaces/BaseMemoryService.md)

###### messages?

[`Message`](../interfaces/Message.md)[]

###### metadata?

`Record`\<`string`, `any`\>

###### sessionId?

`string`

###### sessionService?

[`SessionService`](../interfaces/SessionService.md)

###### userId?

`string`

#### Returns

`InvocationContext`

## Properties

### appName?

> `optional` **appName**: `string`

Defined in: [models/context/InvocationContext.ts:34](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L34)

Application name (for multi-app environments)

***

### config

> **config**: [`RunConfig`](RunConfig.md)

Defined in: [models/context/InvocationContext.ts:24](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L24)

Run configuration

***

### memory

> **memory**: `Map`\<`string`, `any`\>

Defined in: [models/context/InvocationContext.ts:59](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L59)

In-memory storage for node execution results

***

### memoryService?

> `optional` **memoryService**: [`BaseMemoryService`](../interfaces/BaseMemoryService.md)

Defined in: [models/context/InvocationContext.ts:39](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L39)

Memory service for long-term storage

***

### messages

> **messages**: [`Message`](../interfaces/Message.md)[]

Defined in: [models/context/InvocationContext.ts:19](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L19)

Current conversation history

***

### metadata

> **metadata**: `Record`\<`string`, `any`\>

Defined in: [models/context/InvocationContext.ts:49](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L49)

Additional context metadata

***

### sessionId

> **sessionId**: `string`

Defined in: [models/context/InvocationContext.ts:14](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L14)

Unique session ID for the current conversation

***

### sessionService?

> `optional` **sessionService**: [`SessionService`](../interfaces/SessionService.md)

Defined in: [models/context/InvocationContext.ts:44](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L44)

Session service for session management

***

### userId?

> `optional` **userId**: `string`

Defined in: [models/context/InvocationContext.ts:29](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L29)

User identifier associated with the session

## Methods

### addMessage()

> **addMessage**(`message`): `void`

Defined in: [models/context/InvocationContext.ts:111](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L111)

Adds a message to the conversation history

#### Parameters

##### message

[`Message`](../interfaces/Message.md)

#### Returns

`void`

***

### createChildContext()

> **createChildContext**(): `InvocationContext`

Defined in: [models/context/InvocationContext.ts:118](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L118)

Creates a new context with the same configuration but empty message history

#### Returns

`InvocationContext`

***

### getVariable()

> **getVariable**\<`T`\>(`name`, `defaultValue?`): `undefined` \| `T`

Defined in: [models/context/InvocationContext.ts:102](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L102)

Gets a variable from the context

#### Type Parameters

##### T

`T`

#### Parameters

##### name

`string`

##### defaultValue?

`T`

#### Returns

`undefined` \| `T`

***

### loadSession()

> **loadSession**(): `Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

Defined in: [models/context/InvocationContext.ts:134](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L134)

Loads a session from the session service

#### Returns

`Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

The loaded session or undefined if not found

***

### saveSession()

> **saveSession**(): `Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

Defined in: [models/context/InvocationContext.ts:146](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L146)

Saves the current conversation to a session

#### Returns

`Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

The saved session

***

### searchMemory()

> **searchMemory**(`query`, `options?`): `Promise`\<[`SearchMemoryResponse`](../interfaces/SearchMemoryResponse.md)\>

Defined in: [models/context/InvocationContext.ts:187](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L187)

Searches memory for relevant information

#### Parameters

##### query

`string`

The search query

##### options?

[`SearchMemoryOptions`](../interfaces/SearchMemoryOptions.md)

Search options

#### Returns

`Promise`\<[`SearchMemoryResponse`](../interfaces/SearchMemoryResponse.md)\>

Search results or empty response if no memory service

***

### setVariable()

> **setVariable**(`name`, `value`): `void`

Defined in: [models/context/InvocationContext.ts:95](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/context/InvocationContext.ts#L95)

Sets a variable in the context

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`void`
