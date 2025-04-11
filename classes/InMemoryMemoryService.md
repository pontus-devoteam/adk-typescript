[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / InMemoryMemoryService

# Class: InMemoryMemoryService

Defined in: [memory/services/InMemoryMemoryService.ts:9](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L9)

An in-memory memory service for development and testing
Stores sessions and conversations in memory without persistence

## Implements

- [`BaseMemoryService`](../interfaces/BaseMemoryService.md)

## Constructors

### Constructor

> **new InMemoryMemoryService**(): `InMemoryMemoryService`

Defined in: [memory/services/InMemoryMemoryService.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L18)

Constructor for InMemoryMemoryService

#### Returns

`InMemoryMemoryService`

## Methods

### addSessionToMemory()

> **addSessionToMemory**(`session`): `Promise`\<`void`\>

Defined in: [memory/services/InMemoryMemoryService.ts:26](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L26)

Adds a session to the memory service

#### Parameters

##### session

[`Session`](../interfaces/Session.md)

The session to add

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`BaseMemoryService`](../interfaces/BaseMemoryService.md).[`addSessionToMemory`](../interfaces/BaseMemoryService.md#addsessiontomemory)

***

### clear()

> **clear**(): `void`

Defined in: [memory/services/InMemoryMemoryService.ts:145](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L145)

Clears all sessions from memory

#### Returns

`void`

***

### getAllSessions()

> **getAllSessions**(): [`Session`](../interfaces/Session.md)[]

Defined in: [memory/services/InMemoryMemoryService.ts:129](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L129)

Gets all sessions in the memory service

#### Returns

[`Session`](../interfaces/Session.md)[]

All sessions

***

### getSession()

> **getSession**(`sessionId`): `undefined` \| [`Session`](../interfaces/Session.md)

Defined in: [memory/services/InMemoryMemoryService.ts:138](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L138)

Gets a session by ID

#### Parameters

##### sessionId

`string`

The session ID

#### Returns

`undefined` \| [`Session`](../interfaces/Session.md)

The session or undefined if not found

***

### searchMemory()

> **searchMemory**(`query`, `options?`): `Promise`\<[`SearchMemoryResponse`](../interfaces/SearchMemoryResponse.md)\>

Defined in: [memory/services/InMemoryMemoryService.ts:36](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/memory/services/InMemoryMemoryService.ts#L36)

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

Search results

#### Implementation of

[`BaseMemoryService`](../interfaces/BaseMemoryService.md).[`searchMemory`](../interfaces/BaseMemoryService.md#searchmemory)
