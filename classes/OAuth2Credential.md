[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / OAuth2Credential

# Class: OAuth2Credential

Defined in: [models/auth/AuthCredential.ts:171](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L171)

OAuth2 token credential with refresh capability

## Extends

- [`AuthCredential`](AuthCredential.md)

## Constructors

### Constructor

> **new OAuth2Credential**(`config`): `OAuth2Credential`

Defined in: [models/auth/AuthCredential.ts:195](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L195)

Constructor for OAuth2Credential

#### Parameters

##### config

###### accessToken

`string`

###### expiresIn?

`number`

###### refreshFunction?

(`refreshToken`) => `Promise`\<\{ `accessToken`: `string`; `expiresIn`: `number`; `refreshToken`: `string`; \}\>

###### refreshToken?

`string`

#### Returns

`OAuth2Credential`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`constructor`](AuthCredential.md#constructor)

## Properties

### accessToken

> **accessToken**: `string`

Defined in: [models/auth/AuthCredential.ts:175](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L175)

The access token

***

### expiresAt?

> `optional` **expiresAt**: `Date`

Defined in: [models/auth/AuthCredential.ts:185](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L185)

When the token expires

***

### refreshToken?

> `optional` **refreshToken**: `string`

Defined in: [models/auth/AuthCredential.ts:180](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L180)

The refresh token

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

Defined in: [models/auth/AuthCredential.ts:231](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L231)

Whether the token can be refreshed

#### Returns

`boolean`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`canRefresh`](AuthCredential.md#canrefresh)

***

### getHeaders()

> **getHeaders**(): `Record`\<`string`, `string`\>

Defined in: [models/auth/AuthCredential.ts:222](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L222)

Gets headers for HTTP requests

#### Returns

`Record`\<`string`, `string`\>

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getHeaders`](AuthCredential.md#getheaders)

***

### getToken()

> **getToken**(): `string`

Defined in: [models/auth/AuthCredential.ts:215](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L215)

Gets the access token

#### Returns

`string`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getToken`](AuthCredential.md#gettoken)

***

### isExpired()

> **isExpired**(): `boolean`

Defined in: [models/auth/AuthCredential.ts:238](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L238)

Whether the token is expired

#### Returns

`boolean`

***

### refresh()

> **refresh**(): `Promise`\<`void`\>

Defined in: [models/auth/AuthCredential.ts:250](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthCredential.ts#L250)

Refreshes the token

#### Returns

`Promise`\<`void`\>

#### Overrides

[`AuthCredential`](AuthCredential.md).[`refresh`](AuthCredential.md#refresh)
