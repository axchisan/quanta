'use client';

import { useEffect } from 'react';
import { useGameStore, type ChallengeResult } from '@/lib/game/store';

export function useGameSession(playerId: string) {
  const { session, startSession, endSession, completeChallenge } = useGameStore();

  useEffect(() => {
    if (!session) {
      startSession(playerId);
    }
    return () => {
      endSession();
    };
  }, [playerId]);

  const submitResult = (result: Omit<ChallengeResult, 'completedAt'>) => {
    completeChallenge(result);
  };

  return {
    session,
    submitResult,
  };
}

export function ScoreBoard() {
  const { session, getTotalScore, getCompletedCount, getAccuracy } = useGameStore();

  if (!session) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-400">{getTotalScore()}</p>
          <p className="text-xs text-slate-400">PUNTOS</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-400">{getCompletedCount()}</p>
          <p className="text-xs text-slate-400">COMPLETADOS</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-400">{getAccuracy()}%</p>
          <p className="text-xs text-slate-400">PRECISIÓN</p>
        </div>
      </div>
    </div>
  );
}