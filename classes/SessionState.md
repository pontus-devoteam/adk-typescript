[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / SessionState

# Class: SessionState

Defined in: [models/memory/Session.ts:6](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L6)

Represents the state of a session

## Constructors

### Constructor

> **new SessionState**(): `SessionState`

Defined in: [models/memory/Session.ts:10](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L10)

#### Returns

`SessionState`

## Methods

### clearDelta()

> **clearDelta**(): `void`

Defined in: [models/memory/Session.ts:68](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L68)

Clears the dirty state

#### Returns

`void`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: [models/memory/Session.ts:48](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L48)

Deletes a key from the state

#### Parameters

##### key

`string`

The key to delete

#### Returns

`boolean`

Whether the key was deleted

***

### get()

> **get**\<`T`\>(`key`): `undefined` \| `T`

Defined in: [models/memory/Session.ts:30](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L30)

Gets a value from the state

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

The key to get

#### Returns

`undefined` \| `T`

The value or undefined if not present

***

### has()

> **has**(`key`): `boolean`

Defined in: [models/memory/Session.ts:39](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L39)

Checks if the state has a key

#### Parameters

##### key

`string`

The key to check

#### Returns

`boolean`

Whether the key exists

***

### hasDelta()

> **hasDelta**(): `boolean`

Defined in: [models/memory/Session.ts:61](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L61)

Checks if state has changed since last save

#### Returns

`boolean`

Whether the state has been modified

***

### set()

> **set**(`key`, `value`): `void`

Defined in: [models/memory/Session.ts:20](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L20)

Sets a value in the state

#### Parameters

##### key

`string`

The key to set

##### value

`any`

The value to set

#### Returns

`void`

***

### toObject()

> **toObject**(): `Record`\<`string`, `any`\>

Defined in: [models/memory/Session.ts:75](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L75)

Converts the state to a plain object

#### Returns

`Record`\<`string`, `any`\>

***

### fromObject()

> `static` **fromObject**(`obj`): `SessionState`

Defined in: [models/memory/Session.ts:87](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L87)

Creates a state from a plain object

#### Parameters

##### obj

`Record`\<`string`, `any`\>

The object to load

#### Returns

`SessionState`
