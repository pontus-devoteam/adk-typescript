[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BaseTool

# Class: `abstract` BaseTool

Defined in: [tools/base/BaseTool.ts:37](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L37)

The base class for all tools

## Extended by

- [`GoogleSearch`](GoogleSearch.md)

## Constructors

### Constructor

> **new BaseTool**(`config`): `BaseTool`

Defined in: [tools/base/BaseTool.ts:76](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L76)

Constructor for BaseTool

#### Parameters

##### config

[`ToolConfig`](../interfaces/ToolConfig.md)

#### Returns

`BaseTool`

## Properties

### baseRetryDelay

> **baseRetryDelay**: `number` = `1000`

Defined in: [tools/base/BaseTool.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L66)

Base delay for retry in ms (will be used with exponential backoff)

***

### description

> **description**: `string`

Defined in: [tools/base/BaseTool.ts:46](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L46)

Description of the tool

***

### isLongRunning

> **isLongRunning**: `boolean`

Defined in: [tools/base/BaseTool.ts:51](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L51)

Whether the tool is a long running operation

***

### maxRetryAttempts

> **maxRetryAttempts**: `number`

Defined in: [tools/base/BaseTool.ts:61](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L61)

Maximum retry attempts

***

### maxRetryDelay

> **maxRetryDelay**: `number` = `10000`

Defined in: [tools/base/BaseTool.ts:71](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L71)

Maximum delay for retry in ms

***

### name

> **name**: `string`

Defined in: [tools/base/BaseTool.ts:41](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L41)

Name of the tool

***

### shouldRetryOnFailure

> **shouldRetryOnFailure**: `boolean`

Defined in: [tools/base/BaseTool.ts:56](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L56)

Whether the tool execution should be retried on failure

## Methods

### getDeclaration()

> `abstract` **getDeclaration**(): [`FunctionDeclaration`](../interfaces/FunctionDeclaration.md)

Defined in: [tools/base/BaseTool.ts:97](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L97)

Gets the OpenAPI specification of this tool in the form of a FunctionDeclaration

#### Returns

[`FunctionDeclaration`](../interfaces/FunctionDeclaration.md)

***

### runAsync()

> `abstract` **runAsync**(`args`, `context`): `Promise`\<`any`\>

Defined in: [tools/base/BaseTool.ts:132](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L132)

Runs the tool with the given arguments and context
This method must be implemented by subclasses

#### Parameters

##### args

`Record`\<`string`, `any`\>

Arguments for the tool

##### context

[`ToolContext`](ToolContext.md)

Tool execution context

#### Returns

`Promise`\<`any`\>

Result of the tool execution

***

### safeExecute()

> **safeExecute**(`args`, `context`): `Promise`\<`any`\>

Defined in: [tools/base/BaseTool.ts:141](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L141)

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

***

### validateArguments()

> **validateArguments**(`args`): `boolean`

Defined in: [tools/base/BaseTool.ts:104](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/tools/base/BaseTool.ts#L104)

Validates the arguments against the schema in the function declaration

#### Parameters

##### args

`Record`\<`string`, `any`\>

Arguments to validate

#### Returns

`boolean`

True if arguments are valid
