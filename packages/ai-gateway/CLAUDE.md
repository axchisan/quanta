# @quanta/ai-gateway — AI Provider Gateway

## Stack
- TypeScript
- Zod (validation)
- Native fetch

## Scripts
```bash
pnpm build       # tsc
pnpm test        # Vitest
pnpm typecheck   # tsc --noEmit
```

## Providers
- LLM: Gemini, Groq, OpenRouter
- Image: Pollinations, HuggingFace
- TTS: ElevenLabs, Coqui

## Estructura
```
src/
├── providers/     # Implementaciones de providers
├── cache/         # Cache layer (Supabase)
├── prompts/       # Templates de prompts
├── chain.ts       # Fallback chain logic
├── config.ts      # Configuración
└── index.ts       # API pública
```

## Uso
```ts
import { AIGateway } from '@quanta/ai-gateway';

const ai = new AIGateway({ provider: 'gemini' });
const response = await ai.complete('Prompt...');
```