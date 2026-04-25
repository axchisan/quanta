export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  finishReason: 'stop' | 'length' | 'content_filter' | 'error';
}

export interface LLMProvider {
  complete(prompt: string, opts?: { temperature?: number; maxTokens?: number }): Promise<AIResponse>;
}

export interface AIGatewayConfig {
  provider: 'gemini' | 'groq' | 'openrouter';
  apiKey?: string;
  model?: string;
  cache?: boolean;
  cacheTTL?: number;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: TriviaOption[];
  correctAnswer: string;
  explanation: string;
  subject: 'physics' | 'chemistry';
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TriviaOption {
  id: string;
  text: string;
}

export interface TriviaPayload {
  subject: 'physics' | 'chemistry' | 'mixed';
  topic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  count?: number;
}

export interface TriviaChallenge {
  id: string;
  title: string;
  subject: 'physics' | 'chemistry' | 'mixed';
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  kind: 'multiple_choice';
  statement: string;
  payload: TriviaPayload;
  solution: TriviaSolution;
}

export interface TriviaSolution {
  correctAnswer: string;
  explanation: string;
}