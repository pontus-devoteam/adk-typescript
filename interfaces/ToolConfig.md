[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / ToolConfig

# Interface: ToolConfig

Defined in: [tools/base/BaseTool.ts:7](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/tools/base/BaseTool.ts#L7)

Configuration for tool initialization

## Properties

### description

> **description**: `string`

Defined in: [tools/base/BaseTool.ts:16](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/tools/base/BaseTool.ts#L16)

Description of the tool

***

### isLongRunning?

> `optional` **isLongRunning**: `boolean`

Defined in: [tools/base/BaseTool.ts:21](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/tools/base/BaseTool.ts#L21)

Whether the tool is a long running operation

***

### maxRetryAttempts?

> `optional` **maxRetryAttempts**: `number`

Defined in: [tools/base/BaseTool.ts:31](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/tools/base/BaseTool.ts#L31)

Maximum retry attempts

***

### name

> **name**: `string`

Defined in: [tools/base/BaseTool.ts:11](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/tools/base/BaseTool.ts#L11)

Name of the tool

***

### shouldRetryOnFailure?

> `optional` **shouldRetryOnFailure**: `boolean`

Defined in: [tools/base/BaseTool.ts:26](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/tools/base/BaseTool.ts#L26)

Whether the tool execution should be retried on failure
