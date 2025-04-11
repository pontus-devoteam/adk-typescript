[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / LangGraphAgent

# Class: LangGraphAgent

Defined in: [agents/specialized/LangGraphAgent.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/specialized/LangGraphAgent.ts#L66)

LangGraphAgent that implements a directed graph of agents
Allows complex workflows with conditional branching

## Extends

- [`BaseAgent`](BaseAgent.md)

## Constructors

### Constructor

> **new LangGraphAgent**(`config`): `LangGraphAgent`

Defined in: [agents/specialized/LangGraphAgent.ts:90](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/specialized/LangGraphAgent.ts#L90)

Constructor for LangGraphAgent

#### Parameters

##### config

`LangGraphAgentConfig`

#### Returns

`LangGraphAgent`

#### Overrides

[`BaseAgent`](BaseAgent.md).[`constructor`](BaseAgent.md#constructor)

## Properties

### description

> **description**: `string`

Defined in: [agents/base/BaseAgent.ts:19](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L19)

Description about the agent's capability
The LLM uses this to determine whether to delegate control to the agent

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`description`](BaseAgent.md#description)

***

### name

> **name**: `string`

Defined in: [agents/base/BaseAgent.ts:13](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L13)

The agent's name
Agent name must be a unique identifier within the agent tree

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`name`](BaseAgent.md#name)

***

### parentAgent?

> `optional` **parentAgent**: [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:25](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L25)

The parent agent of this agent
Note that an agent can ONLY be added as sub-agent once

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`parentAgent`](BaseAgent.md#parentagent)

***

### subAgents

> **subAgents**: [`BaseAgent`](BaseAgent.md)[]

Defined in: [agents/base/BaseAgent.ts:30](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L30)

The sub-agents of this agent

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`subAgents`](BaseAgent.md#subagents)

## Accessors

### rootAgent

#### Get Signature

> **get** **rootAgent**(): [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:56](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L56)

Gets the root agent of the agent tree

##### Returns

[`BaseAgent`](BaseAgent.md)

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`rootAgent`](BaseAgent.md#rootagent)

## Methods

### addSubAgent()

> **addSubAgent**(`agent`): [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L63)

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

Defined in: [agents/base/BaseAgent.ts:92](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L92)

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

Defined in: [agents/base/BaseAgent.ts:85](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/base/BaseAgent.ts#L85)

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

Defined in: [agents/specialized/LangGraphAgent.ts:249](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/specialized/LangGraphAgent.ts#L249)

Runs the agent with the given messages and configuration
Executes the graph by traversing nodes based on conditions

#### Parameters

##### options

###### config?

[`RunConfig`](RunConfig.md)

###### messages

[`Message`](../interfaces/Message.md)[]

#### Returns

`Promise`\<[`LLMResponse`](LLMResponse.md)\>

#### Overrides

[`BaseAgent`](BaseAgent.md).[`run`](BaseAgent.md#run)

***

### runStreaming()

> **runStreaming**(`options`): `AsyncIterable`\<[`LLMResponse`](LLMResponse.md)\>

Defined in: [agents/specialized/LangGraphAgent.ts:392](https://github.com/pontus-devoteam/adk-typescript/blob/9fe8a397cfb495545a029b2d9b6f8a0adf2c2de5/src/agents/specialized/LangGraphAgent.ts#L392)

Runs the agent with streaming support

#### Parameters

##### options

###### config?

[`RunConfig`](RunConfig.md)

###### messages

[`Message`](../interfaces/Message.md)[]

#### Returns

`AsyncIterable`\<[`LLMResponse`](LLMResponse.md)\>

#### Overrides

[`BaseAgent`](BaseAgent.md).[`runStreaming`](BaseAgent.md#runstreaming)
