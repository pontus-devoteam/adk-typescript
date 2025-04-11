[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / ListSessionOptions

# Interface: ListSessionOptions

Defined in: [models/memory/Session.ts:139](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L139)

Options for listing sessions

## Properties

### createdAfter?

> `optional` **createdAfter**: `Date`

Defined in: [models/memory/Session.ts:148](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L148)

Only include sessions created after this time

***

### limit?

> `optional` **limit**: `number`

Defined in: [models/memory/Session.ts:143](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L143)

Maximum number of sessions to return

***

### metadataFilter?

> `optional` **metadataFilter**: `Record`\<`string`, `any`\>

Defined in: [models/memory/Session.ts:158](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L158)

Filter sessions by metadata

***

### updatedAfter?

> `optional` **updatedAfter**: `Date`

Defined in: [models/memory/Session.ts:153](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/models/memory/Session.ts#L153)

Only include sessions updated after this time
