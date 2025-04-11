[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BearerTokenCredential

# Class: BearerTokenCredential

Defined in: [models/auth/AuthCredential.ts:137](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L137)

Bearer token credential

## Extends

- [`AuthCredential`](AuthCredential.md)

## Constructors

### Constructor

> **new BearerTokenCredential**(`token`): `BearerTokenCredential`

Defined in: [models/auth/AuthCredential.ts:146](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L146)

Constructor for BearerTokenCredential

#### Parameters

##### token

`string`

#### Returns

`BearerTokenCredential`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`constructor`](AuthCredential.md#constructor)

## Properties

### token

> **token**: `string`

Defined in: [models/auth/AuthCredential.ts:141](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L141)

The bearer token

***

### type

> **type**: [`AuthCredentialType`](../enumerations/AuthCredentialType.md)

Defined in: [models/auth/AuthCredential.ts:22](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L22)

Type of credential

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`type`](AuthCredential.md#type)

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

Defined in: [models/auth/AuthCredential.ts:161](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L161)

Gets headers for HTTP requests

#### Returns

`Record`\<`string`, `string`\>

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getHeaders`](AuthCredential.md#getheaders)

***

### getToken()

> **getToken**(): `string`

Defined in: [models/auth/AuthCredential.ts:154](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L154)

Gets the bearer token

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
