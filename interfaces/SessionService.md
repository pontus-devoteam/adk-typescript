[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / SessionService

# Interface: SessionService

Defined in: [memory/services/SessionService.ts:6](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/memory/services/SessionService.ts#L6)

Service for managing sessions

## Methods

### createSession()

> **createSession**(`userId`, `metadata?`): `Promise`\<[`Session`](Session.md)\>

Defined in: [memory/services/SessionService.ts:13](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/memory/services/SessionService.ts#L13)

Creates a new session

#### Parameters

##### userId

`string`

User identifier

##### metadata?

`Record`\<`string`, `any`\>

Optional session metadata

#### Returns

`Promise`\<[`Session`](Session.md)\>

The created session

***

### deleteSession()

> **deleteSession**(`sessionId`): `Promise`\<`void`\>

Defined in: [memory/services/SessionService.ts:40](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/memory/services/SessionService.ts#L40)

Deletes a session

#### Parameters

##### sessionId

`string`

Session identifier

#### Returns

`Promise`\<`void`\>

***

### getSession()

> **getSession**(`sessionId`): `Promise`\<`undefined` \| [`Session`](Session.md)\>

Defined in: [memory/services/SessionService.ts:20](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/memory/services/SessionService.ts#L20)

Gets a session by ID

#### Parameters

##### sessionId

`string`

Session identifier

#### Returns

`Promise`\<`undefined` \| [`Session`](Session.md)\>

The session or undefined if not found

***

### listSessions()

> **listSessions**(`userId`, `options?`): `Promise`\<[`Session`](Session.md)[]\>

Defined in: [memory/services/SessionService.ts:34](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/memory/services/SessionService.ts#L34)

Lists sessions for a user

#### Parameters

##### userId

`string`

User identifier

##### options?

[`ListSessionOptions`](ListSessionOptions.md)

Optional filtering options

#### Returns

`Promise`\<[`Session`](Session.md)[]\>

Array of matching sessions

***

### updateSession()

> **updateSession**(`session`): `Promise`\<`void`\>

Defined in: [memory/services/SessionService.ts:26](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/memory/services/SessionService.ts#L26)

Updates an existing session

#### Parameters

##### session

[`Session`](Session.md)

The session to update

#### Returns

`Promise`\<`void`\>
