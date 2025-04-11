[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / BaseAgent

# Class: `abstract` BaseAgent

Defined in: [agents/base/BaseAgent.ts:8](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L8)

Base class for all agents in the Agent Development Kit

## Extended by

- [`Agent`](Agent.md)
- [`SequentialAgent`](SequentialAgent.md)
- [`ParallelAgent`](ParallelAgent.md)
- [`LoopAgent`](LoopAgent.md)
- [`LangGraphAgent`](LangGraphAgent.md)

## Constructors

### Constructor

> **new BaseAgent**(`config`): `BaseAgent`

Defined in: [agents/base/BaseAgent.ts:35](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L35)

Constructs a new BaseAgent

#### Parameters

##### config

###### description

`string`

###### name

`string`

#### Returns

`BaseAgent`

## Properties

### description

> **description**: `string`

Defined in: [agents/base/BaseAgent.ts:19](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L19)

Description about the agent's capability
The LLM uses this to determine whether to delegate control to the agent

***

### name

> **name**: `string`

Defined in: [agents/base/BaseAgent.ts:13](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L13)

The agent's name
Agent name must be a unique identifier within the agent tree

***

### parentAgent?

> `optional` **parentAgent**: `BaseAgent`

Defined in: [agents/base/BaseAgent.ts:25](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L25)

The parent agent of this agent
Note that an agent can ONLY be added as sub-agent once

***

### subAgents

> **subAgents**: `BaseAgent`[]

Defined in: [agents/base/BaseAgent.ts:30](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L30)

The sub-agents of this agent

## Accessors

### rootAgent

#### Get Signature

> **get** **rootAgent**(): `BaseAgent`

Defined in: [agents/base/BaseAgent.ts:56](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L56)

Gets the root agent of the agent tree

##### Returns

`BaseAgent`

## Methods

### addSubAgent()

> **addSubAgent**(`agent`): `BaseAgent`

Defined in: [agents/base/BaseAgent.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L63)

Adds a sub-agent to this agent

#### Parameters

##### agent

`BaseAgent`

#### Returns

`BaseAgent`

***

### findAgent()

> **findAgent**(`name`): `undefined` \| `BaseAgent`

Defined in: [agents/base/BaseAgent.ts:92](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L92)

Finds an agent in the agent tree by name

#### Parameters

##### name

`string`

#### Returns

`undefined` \| `BaseAgent`

***

### findSubAgent()

> **findSubAgent**(`name`): `undefined` \| `BaseAgent`

Defined in: [agents/base/BaseAgent.ts:85](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L85)

Finds a sub-agent by name

#### Parameters

##### name

`string`

#### Returns

`undefined` \| `BaseAgent`

***

### run()

> `abstract` **run**(`options`): `Promise`\<`any`\>

Defined in: [agents/base/BaseAgent.ts:110](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L110)

Runs the agent with the given messages and configuration

#### Parameters

##### options

###### config?

[`RunConfig`](RunConfig.md)

###### messages

[`Message`](../interfaces/Message.md)[]

###### sessionId?

`string`

#### Returns

`Promise`\<`any`\>

***

### runStreaming()

> `abstract` **runStreaming**(`options`): `AsyncIterable`\<`any`\>

Defined in: [agents/base/BaseAgent.ts:119](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L119)

Runs the agent with streaming support

#### Parameters

##### options

###### config?

[`RunConfig`](RunConfig.md)

###### messages

[`Message`](../interfaces/Message.md)[]

###### sessionId?

`string`

#### Returns

`AsyncIterable`\<`any`\>
