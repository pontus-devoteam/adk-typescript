[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / SequentialAgent

# Class: SequentialAgent

Defined in: [agents/specialized/SequentialAgent.ts:37](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/specialized/SequentialAgent.ts#L37)

Sequential Agent that executes sub-agents in sequence
Each sub-agent's output becomes input to the next agent

## Extends

- [`BaseAgent`](BaseAgent.md)

## Constructors

### Constructor

> **new SequentialAgent**(`config`): `SequentialAgent`

Defined in: [agents/specialized/SequentialAgent.ts:41](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/specialized/SequentialAgent.ts#L41)

Constructor for SequentialAgent

#### Parameters

##### config

`SequentialAgentConfig`

#### Returns

`SequentialAgent`

#### Overrides

[`BaseAgent`](BaseAgent.md).[`constructor`](BaseAgent.md#constructor)

## Properties

### description

> **description**: `string`

Defined in: [agents/base/BaseAgent.ts:19](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L19)

Description about the agent's capability
The LLM uses this to determine whether to delegate control to the agent

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`description`](BaseAgent.md#description)

***

### name

> **name**: `string`

Defined in: [agents/base/BaseAgent.ts:13](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L13)

The agent's name
Agent name must be a unique identifier within the agent tree

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`name`](BaseAgent.md#name)

***

### parentAgent?

> `optional` **parentAgent**: [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:25](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L25)

The parent agent of this agent
Note that an agent can ONLY be added as sub-agent once

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`parentAgent`](BaseAgent.md#parentagent)

***

### subAgents

> **subAgents**: [`BaseAgent`](BaseAgent.md)[]

Defined in: [agents/base/BaseAgent.ts:30](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L30)

The sub-agents of this agent

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`subAgents`](BaseAgent.md#subagents)

## Accessors

### rootAgent

#### Get Signature

> **get** **rootAgent**(): [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:56](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L56)

Gets the root agent of the agent tree

##### Returns

[`BaseAgent`](BaseAgent.md)

#### Inherited from

[`BaseAgent`](BaseAgent.md).[`rootAgent`](BaseAgent.md#rootagent)

## Methods

### addSubAgent()

> **addSubAgent**(`agent`): [`BaseAgent`](BaseAgent.md)

Defined in: [agents/base/BaseAgent.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L63)

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

Defined in: [agents/base/BaseAgent.ts:92](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L92)

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

Defined in: [agents/base/BaseAgent.ts:85](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/base/BaseAgent.ts#L85)

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

> **run**(`options`): `Promise`\<`EnhancedLLMResponse`\>

Defined in: [agents/specialized/SequentialAgent.ts:59](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/specialized/SequentialAgent.ts#L59)

Runs the agent with the given messages and configuration
Executes sub-agents sequentially, passing output from one to the next

#### Parameters

##### options

###### config?

[`RunConfig`](RunConfig.md)

###### messages

[`Message`](../interfaces/Message.md)[]

#### Returns

`Promise`\<`EnhancedLLMResponse`\>

#### Overrides

[`BaseAgent`](BaseAgent.md).[`run`](BaseAgent.md#run)

***

### runStreaming()

> **runStreaming**(`options`): `AsyncIterable`\<`EnhancedLLMResponse`\>

Defined in: [agents/specialized/SequentialAgent.ts:152](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/agents/specialized/SequentialAgent.ts#L152)

Runs the agent with streaming support
Streams responses from each sub-agent in sequence

#### Parameters

##### options

###### config?

[`RunConfig`](RunConfig.md)

###### messages

[`Message`](../interfaces/Message.md)[]

#### Returns

`AsyncIterable`\<`EnhancedLLMResponse`\>

#### Overrides

[`BaseAgent`](BaseAgent.md).[`runStreaming`](BaseAgent.md#runstreaming)
