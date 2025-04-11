[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / OAuth2Scheme

# Class: OAuth2Scheme

Defined in: [models/auth/AuthScheme.ts:116](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L116)

OAuth2 authentication scheme

## Extends

- [`AuthScheme`](AuthScheme.md)

## Constructors

### Constructor

> **new OAuth2Scheme**(`config`): `OAuth2Scheme`

Defined in: [models/auth/AuthScheme.ts:130](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L130)

Constructor for OAuth2Scheme

#### Parameters

##### config

###### description?

`string`

###### flows

`OAuthFlows`

#### Returns

`OAuth2Scheme`

#### Overrides

[`AuthScheme`](AuthScheme.md).[`constructor`](AuthScheme.md#constructor)

## Properties

### description?

> `optional` **description**: `string`

Defined in: [models/auth/AuthScheme.ts:125](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L125)

Description of the scheme

***

### flows

> **flows**: `OAuthFlows`

Defined in: [models/auth/AuthScheme.ts:120](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L120)

OAuth flows

***

### type

> **type**: [`AuthSchemeType`](../enumerations/AuthSchemeType.md)

Defined in: [models/auth/AuthScheme.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/auth/AuthScheme.ts#L18)

The type of authentication scheme

#### Inherited from

[`AuthScheme`](AuthScheme.md).[`type`](AuthScheme.md#type)
