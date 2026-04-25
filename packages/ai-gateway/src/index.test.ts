import { describe, it, expect } from 'vitest';
import { AIGateway } from '../src/index.js';

describe('AIGateway', () => {
  it('creates instance with config', () => {
    const ai = new AIGateway({ provider: 'gemini' });
    expect(ai).toBeDefined();
  });

  it('returns stub response', async () => {
    const ai = new AIGateway({ provider: 'gemini' });
    const response = await ai.complete('test');
    expect(response.content).toBe('stub response');
  });
});