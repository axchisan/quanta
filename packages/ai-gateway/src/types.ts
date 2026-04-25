export interface AIGatewayConfig {
  provider: 'gemini' | 'groq' | 'openrouter';
  apiKey?: string;
}

export interface AIResponse {
  content: string;
  provider: string;
  cached: boolean;
}

export interface LLMProvider {
  complete(prompt: string): Promise<AIResponse>;
  name: string;
}