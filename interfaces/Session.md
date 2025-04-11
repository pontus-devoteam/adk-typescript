[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / Session

# Interface: Session

Defined in: [models/memory/Session.ts:99](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L99)

Represents a conversation session

## Properties

### createdAt

> **createdAt**: `Date`

Defined in: [models/memory/Session.ts:123](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L123)

Session creation timestamp

***

### id

> **id**: `string`

Defined in: [models/memory/Session.ts:103](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L103)

Unique session identifier

***

### messages

> **messages**: [`Message`](Message.md)[]

Defined in: [models/memory/Session.ts:113](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L113)

Conversation history

***

### metadata

> **metadata**: `Record`\<`string`, `any`\>

Defined in: [models/memory/Session.ts:118](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L118)

Additional session metadata

***

### state

> **state**: [`SessionState`](../classes/SessionState.md)

Defined in: [models/memory/Session.ts:133](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L133)

Session state for storing arbitrary data

***

### updatedAt

> **updatedAt**: `Date`

Defined in: [models/memory/Session.ts:128](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L128)

Last update timestamp

***

### userId

> **userId**: `string`

Defined in: [models/memory/Session.ts:108](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L108)

User identifier associated with the session
