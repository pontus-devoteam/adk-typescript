[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BaseMemoryService

# Interface: BaseMemoryService

Defined in: [models/memory/MemoryService.ts:61](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L61)

Base interface for memory services

## Methods

### addSessionToMemory()

> **addSessionToMemory**(`session`): `Promise`\<`void`\>

Defined in: [models/memory/MemoryService.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L66)

Adds a session to the memory service

#### Parameters

##### session

[`Session`](Session.md)

The session to add

#### Returns

`Promise`\<`void`\>

***

### searchMemory()

> **searchMemory**(`query`, `options?`): `Promise`\<[`SearchMemoryResponse`](SearchMemoryResponse.md)\>

Defined in: [models/memory/MemoryService.ts:74](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L74)

Searches memory for relevant information

#### Parameters

##### query

`string`

The search query

##### options?

[`SearchMemoryOptions`](SearchMemoryOptions.md)

Search options

#### Returns

`Promise`\<[`SearchMemoryResponse`](SearchMemoryResponse.md)\>

Search results
