[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / AuthScheme

# Class: `abstract` AuthScheme

Defined in: [models/auth/AuthScheme.ts:14](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L14)

Base class for authentication schemes

## Extended by

- [`ApiKeyScheme`](ApiKeyScheme.md)
- [`HttpScheme`](HttpScheme.md)
- [`OAuth2Scheme`](OAuth2Scheme.md)
- [`OpenIdConnectScheme`](OpenIdConnectScheme.md)

## Constructors

### Constructor

> **new AuthScheme**(`type`): `AuthScheme`

Defined in: [models/auth/AuthScheme.ts:20](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L20)

#### Parameters

##### type

[`AuthSchemeType`](../enumerations/AuthSchemeType.md)

#### Returns

`AuthScheme`

## Properties

### type

> **type**: [`AuthSchemeType`](../enumerations/AuthSchemeType.md)

Defined in: [models/auth/AuthScheme.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L18)

The type of authentication scheme
