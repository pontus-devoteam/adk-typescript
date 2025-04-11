[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / Agent

# Class: Agent

Defined in: [agents/specialized/Agent.ts:88](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L88)

Standard Agent implementation that uses an LLM

## Extends

- [`BaseAgent`](BaseAgent.md)

## Constructors

### Constructor

> **new Agent**(`config`): `Agent`

Defined in: [agents/specialized/Agent.ts:152](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L152)

Constructor for Agent

#### Parameters

##### config

[`AgentConfig`](../interfaces/AgentConfig.md)

#### Returns

`Agent`

#### Overrides

[`BaseAgent`](BaseAgent.md).[`constructor`](BaseAgent.md#constructor)

## Properties

### description

> **description**: `string`

Defined in: [agents/base/BaseAgent.ts:19](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L19)

Description about the agent's capability
The LLM uses this to determine whether to delegate control to the agent

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`description`](BaseAgent.md#description)

***

### name

> **name**: `string`

Defined in: [agents/base/BaseAgent.ts:13](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L13)

The agent's name
Agent name must be a unique identifier within the agent tree

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`name`](BaseAgent.md#name)

***

### parentAgent?

> `optional` **parentAgent**: [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:25](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L25)

The parent agent of this agent
Note that an agent can ONLY be added as sub-agent once

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`parentAgent`](BaseAgent.md#parentagent)

***

### subAgents

> **subAgents**: [`BaseAgent`](BaseAgent.md)[]

Defined in: [agents/base/BaseAgent.ts:30](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L30)

The sub-agents of this agent

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`subAgents`](BaseAgent.md#subagents)

## Accessors

### rootAgent

#### Get Signature

> **get** **rootAgent**(): [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:56](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L56)

Gets the root agent of the agent tree

##### Returns

[`BaseAgent`](BaseAgent.md)

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`rootAgent`](BaseAgent.md#rootagent)

## Methods

### addSubAgent()

> **addSubAgent**(`agent`): [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L63)

Adds a sub-agent to this agent

#### Parameters

##### agent

[`BaseAgent`](BaseAgent.md)

#### Returns

[`BaseAgent`](BaseAgent.md)

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`addSubAgent`](BaseAgent.md#addsubagent)

***

### findAgent()

> **findAgent**(`name`): `undefined` \| [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:92](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L92)

Finds an agent in the agent tree by name

#### Parameters

##### name

`string`

#### Returns

`undefined` \| [`BaseAgent`](BaseAgent.md)

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`findAgent`](BaseAgent.md#findagent)

***

### findSubAgent()

> **findSubAgent**(`name`): `undefined` \| [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:85](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/base/BaseAgent.ts#L85)

Finds a sub-agent by name

#### Parameters

##### name

`string`

#### Returns

`undefined` \| [`BaseAgent`](BaseAgent.md)

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`findSubAgent`](BaseAgent.md#findsubagent)

***

### run()

> **run**(`options`): `Promise`\<[`LLMResponse`](LLMResponse.md)\>

Defined in: [agents/specialized/Agent.ts:383](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L383)

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

`Promise`\<[`LLMResponse`](LLMResponse.md)\>

#### Overrides

[`BaseAgent`](BaseAgent.md).[`run`](BaseAgent.md#run)

***

### runStreaming()

> **runStreaming**(`options`): `AsyncGenerator`\<[`LLMResponse`](LLMResponse.md)\>

Defined in: [agents/specialized/Agent.ts:516](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L516)

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

`AsyncGenerator`\<[`LLMResponse`](LLMResponse.md)\>

#### Overrides

[`BaseAgent`](BaseAgent.md).[`runStreaming`](BaseAgent.md#runstreaming)
