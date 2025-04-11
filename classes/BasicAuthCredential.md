[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BasicAuthCredential

# Class: BasicAuthCredential

Defined in: [models/auth/AuthCredential.ts:97](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L97)

Basic authentication credential

## Extends

- [`AuthCredential`](AuthCredential.md)

## Constructors

### Constructor

> **new BasicAuthCredential**(`username`, `password`): `BasicAuthCredential`

Defined in: [models/auth/AuthCredential.ts:111](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L111)

Constructor for BasicAuthCredential

#### Parameters

##### username

`string`

##### password

`string`

#### Returns

`BasicAuthCredential`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`constructor`](AuthCredential.md#constructor)

## Properties

### password

> **password**: `string`

Defined in: [models/auth/AuthCredential.ts:106](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L106)

The password

***

### type

> **type**: [`AuthCredentialType`](../enumerations/AuthCredentialType.md)

Defined in: [models/auth/AuthCredential.ts:22](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L22)

Type of credential

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`type`](AuthCredential.md#type)

***

### username

> **username**: `string`

Defined in: [models/auth/AuthCredential.ts:101](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L101)

The username

## Methods

### canRefresh()

> **canRefresh**(): `boolean`

Defined in: [models/auth/AuthCredential.ts:44](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L44)

Whether the token can be refreshed

#### Returns

`boolean`

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`canRefresh`](AuthCredential.md#canrefresh)

***

### getHeaders()

> **getHeaders**(): `Record`\<`string`, `string`\>

Defined in: [models/auth/AuthCredential.ts:127](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L127)

Gets headers for HTTP requests

#### Returns

`Record`\<`string`, `string`\>

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getHeaders`](AuthCredential.md#getheaders)

***

### getToken()

> **getToken**(): `string`

Defined in: [models/auth/AuthCredential.ts:120](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L120)

Gets the encoded basic auth token

#### Returns

`string`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getToken`](AuthCredential.md#gettoken)

***

### refresh()

> **refresh**(): `Promise`\<`void`\>

Defined in: [models/auth/AuthCredential.ts:51](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L51)

Refreshes the token

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`refresh`](AuthCredential.md#refresh)
