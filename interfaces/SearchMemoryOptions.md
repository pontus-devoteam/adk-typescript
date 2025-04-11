[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / SearchMemoryOptions

# Interface: SearchMemoryOptions

Defined in: [models/memory/MemoryService.ts:36](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L36)

Options for memory search

## Properties

### filter?

> `optional` **filter**: `Record`\<`string`, `any`\>

Defined in: [models/memory/MemoryService.ts:55](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L55)

Additional filter criteria

***

### limit?

> `optional` **limit**: `number`

Defined in: [models/memory/MemoryService.ts:45](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L45)

Maximum number of results to return

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: [models/memory/MemoryService.ts:40](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L40)

Session ID to search within (null for all sessions)

***

### threshold?

> `optional` **threshold**: `number`

Defined in: [models/memory/MemoryService.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L50)

Minimum relevance score (0-1)
