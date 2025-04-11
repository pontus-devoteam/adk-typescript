[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / ToolContext

# Class: ToolContext

Defined in: [models/context/ToolContext.ts:40](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L40)

Context for tool execution

## Implements

- `IToolContext`

## Constructors

### Constructor

> **new ToolContext**(`options`): `ToolContext`

Defined in: [models/context/ToolContext.ts:74](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L74)

Constructor for ToolContext

#### Parameters

##### options

###### auth?

[`AuthHandler`](AuthHandler.md)

###### invocationContext

[`InvocationContext`](InvocationContext.md)

###### parameters?

`Record`\<`string`, `any`\>

#### Returns

`ToolContext`

## Properties

### auth?

> `optional` **auth**: [`AuthHandler`](AuthHandler.md)

Defined in: [models/context/ToolContext.ts:49](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L49)

Authentication handler for the tool

***

### parameters

> **parameters**: `Record`\<`string`, `any`\>

Defined in: [models/context/ToolContext.ts:54](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L54)

Additional parameters for the tool

#### Implementation of

`IToolContext.parameters`

***

### toolId

> **toolId**: `string` = `''`

Defined in: [models/context/ToolContext.ts:64](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L64)

Tool ID

#### Implementation of

`IToolContext.toolId`

***

### toolName

> **toolName**: `string` = `''`

Defined in: [models/context/ToolContext.ts:59](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L59)

Tool name

#### Implementation of

`IToolContext.toolName`

## Accessors

### appName

#### Get Signature

> **get** **appName**(): `undefined` \| `string`

Defined in: [models/context/ToolContext.ts:106](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L106)

##### Returns

`undefined` \| `string`

***

### config

#### Get Signature

> **get** **config**(): [`RunConfig`](RunConfig.md)

Defined in: [models/context/ToolContext.ts:104](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L104)

##### Returns

[`RunConfig`](RunConfig.md)

***

### memoryService

#### Get Signature

> **get** **memoryService**(): `undefined` \| [`BaseMemoryService`](../interfaces/BaseMemoryService.md)

Defined in: [models/context/ToolContext.ts:107](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L107)

##### Returns

`undefined` \| [`BaseMemoryService`](../interfaces/BaseMemoryService.md)

***

### messages

#### Get Signature

> **get** **messages**(): [`Message`](../interfaces/Message.md)[]

Defined in: [models/context/ToolContext.ts:103](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L103)

##### Returns

[`Message`](../interfaces/Message.md)[]

***

### metadata

#### Get Signature

> **get** **metadata**(): `Record`\<`string`, `any`\>

Defined in: [models/context/ToolContext.ts:109](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L109)

##### Returns

`Record`\<`string`, `any`\>

***

### sessionId

#### Get Signature

> **get** **sessionId**(): `string`

Defined in: [models/context/ToolContext.ts:102](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L102)

##### Returns

`string`

***

### sessionService

#### Get Signature

> **get** **sessionService**(): `undefined` \| [`SessionService`](../interfaces/SessionService.md)

Defined in: [models/context/ToolContext.ts:108](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L108)

##### Returns

`undefined` \| [`SessionService`](../interfaces/SessionService.md)

***

### userId

#### Get Signature

> **get** **userId**(): `undefined` \| `string`

Defined in: [models/context/ToolContext.ts:105](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L105)

##### Returns

`undefined` \| `string`

***

### variables

#### Get Signature

> **get** **variables**(): `Map`\<`string`, `any`\>

Defined in: [models/context/ToolContext.ts:112](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L112)

##### Returns

`Map`\<`string`, `any`\>

## Methods

### addMessage()

> **addMessage**(`message`): `void`

Defined in: [models/context/ToolContext.ts:121](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L121)

#### Parameters

##### message

[`Message`](../interfaces/Message.md)

#### Returns

`void`

***

### getParameter()

> **getParameter**\<`T`\>(`name`, `defaultValue?`): `undefined` \| `T`

Defined in: [models/context/ToolContext.ts:88](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L88)

Gets a parameter value

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

#### Implementation of

`IToolContext.getParameter`

***

### getVariable()

> **getVariable**\<`T`\>(`name`, `defaultValue?`): `undefined` \| `T`

Defined in: [models/context/ToolContext.ts:114](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L114)

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

Defined in: [models/context/ToolContext.ts:122](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L122)

#### Returns

`Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

***

### saveSession()

> **saveSession**(): `Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

Defined in: [models/context/ToolContext.ts:123](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L123)

#### Returns

`Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

***

### searchMemory()

> **searchMemory**(`query`, `options?`): `Promise`\<[`SearchMemoryResponse`](../interfaces/SearchMemoryResponse.md)\>

Defined in: [models/context/ToolContext.ts:124](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L124)

#### Parameters

##### query

`string`

##### options?

[`SearchMemoryOptions`](../interfaces/SearchMemoryOptions.md)

#### Returns

`Promise`\<[`SearchMemoryResponse`](../interfaces/SearchMemoryResponse.md)\>

***

### setParameter()

> **setParameter**(`name`, `value`): `void`

Defined in: [models/context/ToolContext.ts:97](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L97)

Sets a parameter value

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`void`

#### Implementation of

`IToolContext.setParameter`

***

### setVariable()

> **setVariable**(`name`, `value`): `void`

Defined in: [models/context/ToolContext.ts:113](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/context/ToolContext.ts#L113)

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`void`
