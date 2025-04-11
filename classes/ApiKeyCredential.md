[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / ApiKeyCredential

# Class: ApiKeyCredential

Defined in: [models/auth/AuthCredential.ts:59](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L59)

API Key credential

## Extends

- [`AuthCredential`](AuthCredential.md)

## Constructors

### Constructor

> **new ApiKeyCredential**(`apiKey`): `ApiKeyCredential`

Defined in: [models/auth/AuthCredential.ts:68](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L68)

Constructor for ApiKeyCredential

#### Parameters

##### apiKey

`string`

#### Returns

`ApiKeyCredential`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`constructor`](AuthCredential.md#constructor)

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [models/auth/AuthCredential.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L63)

The API key

***

### type

> **type**: [`AuthCredentialType`](../enumerations/AuthCredentialType.md)

Defined in: [models/auth/AuthCredential.ts:22](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L22)

Type of credential

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`type`](AuthCredential.md#type)

## Methods

### canRefresh()

> **canRefresh**(): `boolean`

Defined in: [models/auth/AuthCredential.ts:44](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L44)

Whether the token can be refreshed

#### Returns

`boolean`

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`canRefresh`](AuthCredential.md#canrefresh)

***

### getHeaders()

> **getHeaders**(`config`): `Record`\<`string`, `string`\>

Defined in: [models/auth/AuthCredential.ts:83](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L83)

Gets headers for HTTP requests

#### Parameters

##### config

[`AuthConfig`](AuthConfig.md)

#### Returns

`Record`\<`string`, `string`\>

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getHeaders`](AuthCredential.md#getheaders)

***

### getToken()

> **getToken**(): `string`

Defined in: [models/auth/AuthCredential.ts:76](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L76)

Gets the API key as the token

#### Returns

`string`

#### Overrides

[`AuthCredential`](AuthCredential.md).[`getToken`](AuthCredential.md#gettoken)

***

### refresh()

> **refresh**(): `Promise`\<`void`\>

Defined in: [models/auth/AuthCredential.ts:51](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthCredential.ts#L51)

Refreshes the token

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AuthCredential`](AuthCredential.md).[`refresh`](AuthCredential.md#refresh)
