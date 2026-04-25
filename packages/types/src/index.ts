export interface Profile {
  id: string;
  username: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Room {
  id: string;
  code: string;
  name: string;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'free_fall' | 'pendulum' | 'equation_balance' | 'trivia';
  difficulty: 'easy' | 'medium' | 'hard';
  physicsConfig: Record<string, unknown>;
}

export interface ChallengeAttempt {
  id: string;
  challengeId: string;
  playerId: string;
  score: number;
  completedAt: string;
}

export type PlayerStatus = 'online' | 'away' | 'offline';