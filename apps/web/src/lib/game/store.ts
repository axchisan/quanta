import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChallengeResult {
  challengeId: string;
  title: string;
  isCorrect: boolean;
  score: number;
  timeTakenMs: number;
  attempts: number;
  completedAt: string;
}

export interface GameSession {
  id: string;
  playerId: string;
  startedAt: string;
  challenges: ChallengeResult[];
  totalScore: number;
}

interface GameStore {
  session: GameSession | null;
  currentChallenge: string | null;
  
  startSession: (playerId: string) => void;
  endSession: () => void;
  
  startChallenge: (challengeId: string) => void;
  completeChallenge: (result: Omit<ChallengeResult, 'completedAt'>) => void;
  
  getTotalScore: () => number;
  getCompletedCount: () => number;
  getAccuracy: () => number;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      session: null,
      currentChallenge: null,

      startSession: (playerId: string) => {
        set({
          session: {
            id: crypto.randomUUID(),
            playerId,
            startedAt: new Date().toISOString(),
            challenges: [],
            totalScore: 0,
          },
        });
      },

      endSession: () => {
        set({ session: null, currentChallenge: null });
      },

      startChallenge: (challengeId: string) => {
        set({ currentChallenge: challengeId });
      },

      completeChallenge: (result: Omit<ChallengeResult, 'completedAt'>) => {
        const { session } = get();
        if (!session) return;

        const newScore = session.totalScore + result.score;
        const completedChallenge: ChallengeResult = {
          ...result,
          completedAt: new Date().toISOString(),
        };

        set({
          session: {
            ...session,
            challenges: [...session.challenges, completedChallenge],
            totalScore: newScore,
          },
          currentChallenge: null,
        });
      },

      getTotalScore: () => get().session?.totalScore ?? 0,

      getCompletedCount: () => get().session?.challenges.length ?? 0,

      getAccuracy: () => {
        const { session } = get();
        if (!session || session.challenges.length === 0) return 0;
        const correct = session.challenges.filter(c => c.isCorrect).length;
        return Math.round((correct / session.challenges.length) * 100);
      },
    }),
    {
      name: 'quanta-game-storage',
      partialize: (state) => ({ session: state.session }),
    }
  )
);