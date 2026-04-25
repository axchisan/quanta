import { AIGatewayConfig, AIResponse, LLMProvider } from './types.js';

export class AIGateway {
  private providers: LLMProvider[] = [];
  private currentIndex = 0;
  private _config: AIGatewayConfig;

  constructor(config: AIGatewayConfig) {
    this._config = config;
  }

  async complete(_prompt: string): Promise<AIResponse> {
    return {
      content: 'stub response',
      model: 'stub-model',
      finishReason: 'stop',
    };
  }

  async completeWithFallback(prompt: string): Promise<AIResponse> {
    const errors: string[] = [];

    for (let i = this.currentIndex; i < this.providers.length; i++) {
      const provider = this.providers[i];
      if (!provider) continue;
      
      try {
        const result = await provider.complete(prompt);
        this.currentIndex = i;
        return result;
      } catch (error) {
        errors.push(`Provider ${i}: ${error}`);
      }
    }

    throw new Error(`All providers failed: ${errors.join(', ')}`);
  }
}

export type { AIGatewayConfig, AIResponse, LLMProvider } from './types.js';