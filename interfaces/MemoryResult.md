[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / MemoryResult

# Interface: MemoryResult

Defined in: [models/memory/MemoryService.ts:6](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L6)

Represents a single memory retrieval result

## Properties

### events

> **events**: `any`[]

Defined in: [models/memory/MemoryService.ts:15](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L15)

Array of events/messages from the session

***

### relevanceScore?

> `optional` **relevanceScore**: `number`

Defined in: [models/memory/MemoryService.ts:20](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L20)

Score indicating relevance to query (0-1)

***

### sessionId

> **sessionId**: `string`

Defined in: [models/memory/MemoryService.ts:10](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/memory/MemoryService.ts#L10)

The session ID associated with the memory
