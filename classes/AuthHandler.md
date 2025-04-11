[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / AuthHandler

# Class: AuthHandler

Defined in: [models/auth/AuthHandler.ts:7](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L7)

Handler for authentication in tools

## Constructors

### Constructor

> **new AuthHandler**(`config`): `AuthHandler`

Defined in: [models/auth/AuthHandler.ts:21](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L21)

Constructor for AuthHandler

#### Parameters

##### config

###### authConfig

[`AuthConfig`](AuthConfig.md)

###### credential?

[`AuthCredential`](AuthCredential.md)

#### Returns

`AuthHandler`

## Properties

### authConfig

> **authConfig**: [`AuthConfig`](AuthConfig.md)

Defined in: [models/auth/AuthHandler.ts:11](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L11)

The authentication configuration

***

### credential?

> `optional` **credential**: [`AuthCredential`](AuthCredential.md)

Defined in: [models/auth/AuthHandler.ts:16](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L16)

The authentication credential

## Methods

### getHeaders()

> **getHeaders**(): `Record`\<`string`, `string`\>

Defined in: [models/auth/AuthHandler.ts:39](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L39)

Gets headers for HTTP requests

#### Returns

`Record`\<`string`, `string`\>

***

### getToken()

> **getToken**(): `undefined` \| `string`

Defined in: [models/auth/AuthHandler.ts:32](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L32)

Gets the authentication token

#### Returns

`undefined` \| `string`

***

### refreshToken()

> **refreshToken**(): `Promise`\<`void`\>

Defined in: [models/auth/AuthHandler.ts:50](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthHandler.ts#L50)

Refreshes the token if necessary

#### Returns

`Promise`\<`void`\>
