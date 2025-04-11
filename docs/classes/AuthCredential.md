[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / AuthCredential

# Class: `abstract` AuthCredential

Defined in: [models/auth/AuthCredential.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L18)

Base class for authentication credentials

## Extended by

- [`ApiKeyCredential`](ApiKeyCredential.md)
- [`BasicAuthCredential`](BasicAuthCredential.md)
- [`BearerTokenCredential`](BearerTokenCredential.md)
- [`OAuth2Credential`](OAuth2Credential.md)

## Constructors

### Constructor

> **new AuthCredential**(`type`): `AuthCredential`

Defined in: [models/auth/AuthCredential.ts:27](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L27)

Constructor for AuthCredential

#### Parameters

##### type

[`AuthCredentialType`](../enumerations/AuthCredentialType.md)

#### Returns

`AuthCredential`

## Properties

### type

> **type**: [`AuthCredentialType`](../enumerations/AuthCredentialType.md)

Defined in: [models/auth/AuthCredential.ts:22](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L22)

Type of credential

## Methods

### canRefresh()

> **canRefresh**(): `boolean`

Defined in: [models/auth/AuthCredential.ts:44](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L44)

Whether the token can be refreshed

#### Returns

`boolean`

***

### getHeaders()

> `abstract` **getHeaders**(`config`): `Record`\<`string`, `string`\>

Defined in: [models/auth/AuthCredential.ts:39](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L39)

Gets headers for HTTP requests

#### Parameters

##### config

[`AuthConfig`](AuthConfig.md)

#### Returns

`Record`\<`string`, `string`\>

***

### getToken()

> `abstract` **getToken**(): `undefined` \| `string`

Defined in: [models/auth/AuthCredential.ts:34](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L34)

Gets the authentication token

#### Returns

`undefined` \| `string`

***

### refresh()

> **refresh**(): `Promise`\<`void`\>

Defined in: [models/auth/AuthCredential.ts:51](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthCredential.ts#L51)

Refreshes the token

#### Returns

`Promise`\<`void`\>
