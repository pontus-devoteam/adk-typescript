[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / HttpScheme

# Class: HttpScheme

Defined in: [models/auth/AuthScheme.ts:62](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L62)

HTTP authentication scheme

## Extends

- [`AuthScheme`](AuthScheme.md)

## Constructors

### Constructor

> **new HttpScheme**(`config`): `HttpScheme`

Defined in: [models/auth/AuthScheme.ts:81](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L81)

Constructor for HttpScheme

#### Parameters

##### config

###### bearerFormat?

`string`

###### description?

`string`

###### scheme

`"basic"` \| `"bearer"` \| `"digest"` \| `"other"`

#### Returns

`HttpScheme`

#### Overrides

[`AuthScheme`](AuthScheme.md).[`constructor`](AuthScheme.md#constructor)

## Properties

### bearerFormat?

> `optional` **bearerFormat**: `string`

Defined in: [models/auth/AuthScheme.ts:71](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L71)

Bearer format when scheme is 'bearer'

***

### description?

> `optional` **description**: `string`

Defined in: [models/auth/AuthScheme.ts:76](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L76)

Description of the scheme

***

### scheme

> **scheme**: `"basic"` \| `"bearer"` \| `"digest"` \| `"other"`

Defined in: [models/auth/AuthScheme.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L66)

The HTTP authentication scheme

***

### type

> **type**: [`AuthSchemeType`](../enumerations/AuthSchemeType.md)

Defined in: [models/auth/AuthScheme.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/models/auth/AuthScheme.ts#L18)

The type of authentication scheme

#### Inherited from

[`AuthScheme`](AuthScheme.md).[`type`](AuthScheme.md#type)
