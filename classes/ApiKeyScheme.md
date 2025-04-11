[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / ApiKeyScheme

# Class: ApiKeyScheme

Defined in: [models/auth/AuthScheme.ts:28](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L28)

API Key authentication scheme

## Extends

- [`AuthScheme`](AuthScheme.md)

## Constructors

### Constructor

> **new ApiKeyScheme**(`config`): `ApiKeyScheme`

Defined in: [models/auth/AuthScheme.ts:47](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L47)

Constructor for ApiKeyScheme

#### Parameters

##### config

###### description?

`string`

###### in

`"query"` \| `"header"` \| `"cookie"`

###### name

`string`

#### Returns

`ApiKeyScheme`

#### Overrides

[`AuthScheme`](AuthScheme.md).[`constructor`](AuthScheme.md#constructor)

## Properties

### description?

> `optional` **description**: `string`

Defined in: [models/auth/AuthScheme.ts:42](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L42)

Description of the API key

***

### in

> **in**: `"query"` \| `"header"` \| `"cookie"`

Defined in: [models/auth/AuthScheme.ts:32](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L32)

Where the API key is sent

***

### name

> **name**: `string`

Defined in: [models/auth/AuthScheme.ts:37](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L37)

Name of the parameter

***

### type

> **type**: [`AuthSchemeType`](../enumerations/AuthSchemeType.md)

Defined in: [models/auth/AuthScheme.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L18)

The type of authentication scheme

#### Inherited from

[`AuthScheme`](AuthScheme.md).[`type`](AuthScheme.md#type)
