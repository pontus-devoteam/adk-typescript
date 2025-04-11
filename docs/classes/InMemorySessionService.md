[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / InMemorySessionService

# Class: InMemorySessionService

Defined in: [memory/services/SessionService.ts:46](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L46)

In-memory implementation of SessionService

## Implements

- [`SessionService`](../interfaces/SessionService.md)

## Constructors

### Constructor

> **new InMemorySessionService**(): `InMemorySessionService`

Defined in: [memory/services/SessionService.ts:55](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L55)

Constructor for InMemorySessionService

#### Returns

`InMemorySessionService`

## Methods

### clear()

> **clear**(): `void`

Defined in: [memory/services/SessionService.ts:163](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L163)

Clears all sessions

#### Returns

`void`

***

### createSession()

> **createSession**(`userId`, `metadata`): `Promise`\<[`Session`](../interfaces/Session.md)\>

Defined in: [memory/services/SessionService.ts:65](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L65)

Creates a new session

#### Parameters

##### userId

`string`

User identifier

##### metadata

`Record`\<`string`, `any`\> = `{}`

Optional session metadata

#### Returns

`Promise`\<[`Session`](../interfaces/Session.md)\>

The created session

#### Implementation of

[`SessionService`](../interfaces/SessionService.md).[`createSession`](../interfaces/SessionService.md#createsession)

***

### deleteSession()

> **deleteSession**(`sessionId`): `Promise`\<`void`\>

Defined in: [memory/services/SessionService.ts:156](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L156)

Deletes a session

#### Parameters

##### sessionId

`string`

Session identifier

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SessionService`](../interfaces/SessionService.md).[`deleteSession`](../interfaces/SessionService.md#deletesession)

***

### getSession()

> **getSession**(`sessionId`): `Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

Defined in: [memory/services/SessionService.ts:88](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L88)

Gets a session by ID

#### Parameters

##### sessionId

`string`

Session identifier

#### Returns

`Promise`\<`undefined` \| [`Session`](../interfaces/Session.md)\>

The session or undefined if not found

#### Implementation of

[`SessionService`](../interfaces/SessionService.md).[`getSession`](../interfaces/SessionService.md#getsession)

***

### listSessions()

> **listSessions**(`userId`, `options?`): `Promise`\<[`Session`](../interfaces/Session.md)[]\>

Defined in: [memory/services/SessionService.ts:110](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L110)

Lists sessions for a user

#### Parameters

##### userId

`string`

User identifier

##### options?

[`ListSessionOptions`](../interfaces/ListSessionOptions.md)

Optional filtering options

#### Returns

`Promise`\<[`Session`](../interfaces/Session.md)[]\>

Array of matching sessions

#### Implementation of

[`SessionService`](../interfaces/SessionService.md).[`listSessions`](../interfaces/SessionService.md#listsessions)

***

### updateSession()

> **updateSession**(`session`): `Promise`\<`void`\>

Defined in: [memory/services/SessionService.ts:96](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/memory/services/SessionService.ts#L96)

Updates an existing session

#### Parameters

##### session

[`Session`](../interfaces/Session.md)

The session to update

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SessionService`](../interfaces/SessionService.md).[`updateSession`](../interfaces/SessionService.md#updatesession)
