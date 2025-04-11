[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / GoogleSearch

# Class: GoogleSearch

Defined in: [tools/common/GoogleSearch.ts:8](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/common/GoogleSearch.ts#L8)

Simple GoogleSearch tool implementation

## Extends

- [`BaseTool`](BaseTool.md)

## Constructors

### Constructor

> **new GoogleSearch**(): `GoogleSearch`

Defined in: [tools/common/GoogleSearch.ts:12](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/common/GoogleSearch.ts#L12)

Constructor for GoogleSearch

#### Returns

`GoogleSearch`

#### Overrides

[`BaseTool`](BaseTool.md).[`constructor`](BaseTool.md#constructor)

## Properties

### baseRetryDelay

> **baseRetryDelay**: `number` = `1000`

Defined in: [tools/base/BaseTool.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L66)

Base delay for retry in ms (will be used with exponential backoff)

#### Inherited from

[`BaseTool`](BaseTool.md).[`baseRetryDelay`](BaseTool.md#baseretrydelay)

***

### description

> **description**: `string`

Defined in: [tools/base/BaseTool.ts:46](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L46)

Description of the tool

#### Inherited from

[`BaseTool`](BaseTool.md).[`description`](BaseTool.md#description)

***

### isLongRunning

> **isLongRunning**: `boolean`

Defined in: [tools/base/BaseTool.ts:51](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L51)

Whether the tool is a long running operation

#### Inherited from

[`BaseTool`](BaseTool.md).[`isLongRunning`](BaseTool.md#islongrunning)

***

### maxRetryAttempts

> **maxRetryAttempts**: `number`

Defined in: [tools/base/BaseTool.ts:61](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L61)

Maximum retry attempts

#### Inherited from

[`BaseTool`](BaseTool.md).[`maxRetryAttempts`](BaseTool.md#maxretryattempts)

***

### maxRetryDelay

> **maxRetryDelay**: `number` = `10000`

Defined in: [tools/base/BaseTool.ts:71](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L71)

Maximum delay for retry in ms

#### Inherited from

[`BaseTool`](BaseTool.md).[`maxRetryDelay`](BaseTool.md#maxretrydelay)

***

### name

> **name**: `string`

Defined in: [tools/base/BaseTool.ts:41](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L41)

Name of the tool

#### Inherited from

[`BaseTool`](BaseTool.md).[`name`](BaseTool.md#name)

***

### shouldRetryOnFailure

> **shouldRetryOnFailure**: `boolean`

Defined in: [tools/base/BaseTool.ts:56](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L56)

Whether the tool execution should be retried on failure

#### Inherited from

[`BaseTool`](BaseTool.md).[`shouldRetryOnFailure`](BaseTool.md#shouldretryonfailure)

## Methods

### getDeclaration()

> **getDeclaration**(): [`FunctionDeclaration`](../interfaces/FunctionDeclaration.md)

Defined in: [tools/common/GoogleSearch.ts:22](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/common/GoogleSearch.ts#L22)

Get the function declaration for the tool

#### Returns

[`FunctionDeclaration`](../interfaces/FunctionDeclaration.md)

#### Overrides

[`BaseTool`](BaseTool.md).[`getDeclaration`](BaseTool.md#getdeclaration)

***

### runAsync()

> **runAsync**(`args`, `_context`): `Promise`\<`any`\>

Defined in: [tools/common/GoogleSearch.ts:48](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/common/GoogleSearch.ts#L48)

Execute the search
This is a simplified implementation that doesn't actually search, just returns mock results

#### Parameters

##### args

###### num_results?

`number`

###### query

`string`

##### \_context

[`ToolContext`](ToolContext.md)

#### Returns

`Promise`\<`any`\>

#### Overrides

[`BaseTool`](BaseTool.md).[`runAsync`](BaseTool.md#runasync)

***

### safeExecute()

> **safeExecute**(`args`, `context`): `Promise`\<`any`\>

Defined in: [tools/base/BaseTool.ts:141](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L141)

Executes the tool with error handling and retries

#### Parameters

##### args

`Record`\<`string`, `any`\>

Arguments for the tool

##### context

[`ToolContext`](ToolContext.md)

Tool execution context

#### Returns

`Promise`\<`any`\>

Result of the tool execution or error information

#### Inherited from

[`BaseTool`](BaseTool.md).[`safeExecute`](BaseTool.md#safeexecute)

***

### validateArguments()

> **validateArguments**(`args`): `boolean`

Defined in: [tools/base/BaseTool.ts:104](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/tools/base/BaseTool.ts#L104)

Validates the arguments against the schema in the function declaration

#### Parameters

##### args

`Record`\<`string`, `any`\>

Arguments to validate

#### Returns

`boolean`

True if arguments are valid

#### Inherited from

[`BaseTool`](BaseTool.md).[`validateArguments`](BaseTool.md#validatearguments)
