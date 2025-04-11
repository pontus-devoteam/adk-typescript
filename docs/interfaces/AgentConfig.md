[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / AgentConfig

# Interface: AgentConfig

Defined in: [agents/specialized/Agent.ts:18](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L18)

Configuration for Agent

## Properties

### appName?

> `optional` **appName**: `string`

Defined in: [agents/specialized/Agent.ts:67](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L67)

Application name (for multi-app environments)

***

### description

> **description**: `string`

Defined in: [agents/specialized/Agent.ts:27](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L27)

Description of the agent

***

### instructions?

> `optional` **instructions**: `string`

Defined in: [agents/specialized/Agent.ts:37](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L37)

Instructions for the agent

***

### maxMemoryItems?

> `optional` **maxMemoryItems**: `number`

Defined in: [agents/specialized/Agent.ts:77](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L77)

The maximum number of memory items to include in augmentation

***

### maxToolExecutionSteps?

> `optional` **maxToolExecutionSteps**: `number`

Defined in: [agents/specialized/Agent.ts:47](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L47)

Maximum number of tool execution steps

***

### memoryRelevanceThreshold?

> `optional` **memoryRelevanceThreshold**: `number`

Defined in: [agents/specialized/Agent.ts:82](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L82)

The minimum relevance score for memory augmentation (0-1)

***

### memoryService?

> `optional` **memoryService**: [`BaseMemoryService`](BaseMemoryService.md)

Defined in: [agents/specialized/Agent.ts:52](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L52)

Memory service for long-term storage and retrieval

***

### model

> **model**: `string`

Defined in: [agents/specialized/Agent.ts:32](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L32)

The LLM model to use

***

### name

> **name**: `string`

Defined in: [agents/specialized/Agent.ts:22](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L22)

Name of the agent

***

### sessionService?

> `optional` **sessionService**: [`SessionService`](SessionService.md)

Defined in: [agents/specialized/Agent.ts:57](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L57)

Session service for managing conversations

***

### tools?

> `optional` **tools**: [`BaseTool`](../classes/BaseTool.md)[]

Defined in: [agents/specialized/Agent.ts:42](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L42)

Tools available to the agent

***

### useMemoryAugmentation?

> `optional` **useMemoryAugmentation**: `boolean`

Defined in: [agents/specialized/Agent.ts:72](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L72)

Whether to automatically augment prompts with relevant memory

***

### userId?

> `optional` **userId**: `string`

Defined in: [agents/specialized/Agent.ts:62](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/agents/specialized/Agent.ts#L62)

User ID for the session (required for session persistence)
