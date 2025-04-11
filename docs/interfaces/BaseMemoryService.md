[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BaseMemoryService

# Interface: BaseMemoryService

Defined in: [models/memory/MemoryService.ts:61](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/memory/MemoryService.ts#L61)

Base interface for memory services

## Methods

### addSessionToMemory()

> **addSessionToMemory**(`session`): `Promise`\<`void`\>

Defined in: [models/memory/MemoryService.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/memory/MemoryService.ts#L66)

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

Defined in: [models/memory/MemoryService.ts:74](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/memory/MemoryService.ts#L74)

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
