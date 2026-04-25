import type { AIResponse, LLMProvider, AIGatewayConfig } from './types.js';

export class AIGateway {
  private providers: LLMProvider[];
  private currentIndex = 0;

  constructor(config: AIGatewayConfig) {
    this.providers = [];
  }

  async complete(prompt: string): Promise<AIResponse> {
    return {
      content: 'stub response',
      provider: 'stub',
      cached: false,
    };
  }

  async completeWithFallback(prompt: string): Promise<AIResponse> {
    const errors: string[] = [];

    for (let i = this.currentIndex; i < this.providers.length; i++) {
      try {
        const result = await this.providers[i].complete(prompt);
        this.currentIndex = i;
        return result;
      } catch (error) {
        errors.push(`${this.providers[i].name}: ${error}`);
      }
    }

    throw new Error(`All providers failed: ${errors.join(', ')}`);
  }
}