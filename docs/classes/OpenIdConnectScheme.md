[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / OpenIdConnectScheme

# Class: OpenIdConnectScheme

Defined in: [models/auth/AuthScheme.ts:143](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthScheme.ts#L143)

OpenID Connect authentication scheme

## Extends

- [`AuthScheme`](AuthScheme.md)

## Constructors

### Constructor

> **new OpenIdConnectScheme**(`config`): `OpenIdConnectScheme`

Defined in: [models/auth/AuthScheme.ts:157](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthScheme.ts#L157)

Constructor for OpenIdConnectScheme

#### Parameters

##### config

###### description?

`string`

###### openIdConnectUrl

`string`

#### Returns

`OpenIdConnectScheme`

#### Overrides

[`AuthScheme`](AuthScheme.md).[`constructor`](AuthScheme.md#constructor)

## Properties

### description?

> `optional` **description**: `string`

Defined in: [models/auth/AuthScheme.ts:152](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthScheme.ts#L152)

Description of the scheme

***

### openIdConnectUrl

> **openIdConnectUrl**: `string`

Defined in: [models/auth/AuthScheme.ts:147](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthScheme.ts#L147)

OpenID Connect URL

***

### type

> **type**: [`AuthSchemeType`](../enumerations/AuthSchemeType.md)

Defined in: [models/auth/AuthScheme.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/auth/AuthScheme.ts#L18)

The type of authentication scheme

#### Inherited from

[`AuthScheme`](AuthScheme.md).[`type`](AuthScheme.md#type)
