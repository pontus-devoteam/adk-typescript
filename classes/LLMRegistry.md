[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / LLMRegistry

# Class: LLMRegistry

Defined in: [llm/registry/LLMRegistry.ts:14](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/registry/LLMRegistry.ts#L14)

Registry for LLMs

## Constructors

### Constructor

> **new LLMRegistry**(): `LLMRegistry`

#### Returns

`LLMRegistry`

## Methods

### logRegisteredModels()

> `static` **logRegisteredModels**(): `void`

Defined in: [llm/registry/LLMRegistry.ts:77](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/registry/LLMRegistry.ts#L77)

Logs all registered models for debugging

#### Returns

`void`

***

### newLLM()

> `static` **newLLM**(`model`): [`BaseLLM`](BaseLLM.md)

Defined in: [llm/registry/LLMRegistry.ts:26](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/registry/LLMRegistry.ts#L26)

Creates a new LLM instance

#### Parameters

##### model

`string`

The model name

#### Returns

[`BaseLLM`](BaseLLM.md)

The LLM instance

***

### register()

> `static` **register**(`modelNameRegex`, `llmClass`): `void`

Defined in: [llm/registry/LLMRegistry.ts:57](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/registry/LLMRegistry.ts#L57)

Registers a new LLM class

#### Parameters

##### modelNameRegex

`string`

The regex to match model names

##### llmClass

`LLMClass`

The LLM class

#### Returns

`void`

***

### registerLLM()

> `static` **registerLLM**(`llmClass`): `void`

Defined in: [llm/registry/LLMRegistry.ts:66](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/registry/LLMRegistry.ts#L66)

Registers all model patterns from an LLM class

#### Parameters

##### llmClass

`LLMClass`

The LLM class

#### Returns

`void`

***

### resolve()

> `static` **resolve**(`model`): `null` \| `LLMClass`

Defined in: [llm/registry/LLMRegistry.ts:41](https://github.com/pontus-devoteam/adk-typescript/blob/debe65286edf8e899c3500f5b5966544d2447b8d/src/llm/registry/LLMRegistry.ts#L41)

Resolves the LLM class from the model name

#### Parameters

##### model

`string`

The model name

#### Returns

`null` \| `LLMClass`

The LLM class
