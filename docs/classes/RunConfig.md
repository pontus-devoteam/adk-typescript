[**ADK TypeScript Documentation v0.0.1**](../README.md)

***

[ADK TypeScript Documentation](../globals.md) / RunConfig

# Class: RunConfig

Defined in: [models/config/RunConfig.ts:54](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L54)

Configs for runtime behavior of agents

## Constructors

### Constructor

> **new RunConfig**(`config?`): `RunConfig`

Defined in: [models/config/RunConfig.ts:86](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L86)

#### Parameters

##### config?

`Partial`\<`RunConfig`\>

#### Returns

`RunConfig`

## Properties

### outputAudioTranscription?

> `optional` **outputAudioTranscription**: `AudioTranscriptionConfig`

Defined in: [models/config/RunConfig.ts:84](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L84)

Output audio transcription configuration

***

### responseModalities?

> `optional` **responseModalities**: `string`[]

Defined in: [models/config/RunConfig.ts:63](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L63)

The output modalities

***

### saveInputBlobsAsArtifacts

> **saveInputBlobsAsArtifacts**: `boolean`

Defined in: [models/config/RunConfig.ts:68](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L68)

Whether to save input blobs as artifacts

***

### speechConfig?

> `optional` **speechConfig**: `SpeechConfig`

Defined in: [models/config/RunConfig.ts:58](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L58)

Speech configuration for the live agent

***

### streamingMode

> **streamingMode**: [`StreamingMode`](../enumerations/StreamingMode.md)

Defined in: [models/config/RunConfig.ts:79](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L79)

Streaming mode

***

### supportCFC

> **supportCFC**: `boolean`

Defined in: [models/config/RunConfig.ts:74](https://github.com/pontus-devoteam/adk-typescript/blob/0f66151c645c59f98bf29f75515acbeb98026e1f/src/models/config/RunConfig.ts#L74)

Whether to support Compositional Function Calling
Only applicable for StreamingMode.SSE
