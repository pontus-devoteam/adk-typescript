[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / PersistentMemoryService

# Class: PersistentMemoryService

Defined in: [memory/services/PersistentMemoryService.ts:31](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L31)

A file-based implementation of memory service that persists data to disk
This provides durability across application restarts

## Implements

- [`BaseMemoryService`](../interfaces/BaseMemoryService.md)

## Constructors

### Constructor

> **new PersistentMemoryService**(`config`): `PersistentMemoryService`

Defined in: [memory/services/PersistentMemoryService.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L50)

Constructor for PersistentMemoryService

#### Parameters

##### config

`PersistentMemoryServiceConfig`

#### Returns

`PersistentMemoryService`

## Methods

### addSessionToMemory()

> **addSessionToMemory**(`session`): `Promise`\<`void`\>

Defined in: [memory/services/PersistentMemoryService.ts:68](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L68)

Adds a session to memory and persists to disk

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

> **clear**(): `Promise`\<`void`\>

Defined in: [memory/services/PersistentMemoryService.ts:208](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L208)

Clears all sessions from memory and disk

#### Returns

`Promise`\<`void`\>

***

### deleteSession()

> **deleteSession**(`sessionId`): `Promise`\<`void`\>

Defined in: [memory/services/PersistentMemoryService.ts:188](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L188)

Deletes a session from memory and disk

#### Parameters

##### sessionId

`string`

Session ID to delete

#### Returns

`Promise`\<`void`\>

***

### getAllSessions()

> **getAllSessions**(): [`Session`](../interfaces/Session.md)[]

Defined in: [memory/services/PersistentMemoryService.ts:171](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L171)

Gets all sessions in memory

#### Returns

[`Session`](../interfaces/Session.md)[]

Array of sessions

***

### getSession()

> **getSession**(`sessionId`): `undefined` \| [`Session`](../interfaces/Session.md)

Defined in: [memory/services/PersistentMemoryService.ts:180](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L180)

Gets a session by ID

#### Parameters

##### sessionId

`string`

Session ID

#### Returns

`undefined` \| [`Session`](../interfaces/Session.md)

The session or undefined if not found

***

### searchMemory()

> **searchMemory**(`query`, `options?`): `Promise`\<[`SearchMemoryResponse`](../interfaces/SearchMemoryResponse.md)\>

Defined in: [memory/services/PersistentMemoryService.ts:82](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/PersistentMemoryService.ts#L82)

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
