'use client';

import { useState } from 'react';
import { FreeFallGame } from '@/components/game';
import type { FreeFallChallenge, ChallengeResult, FreeFallPayload, FreeFallSolution } from '@/lib/game/types';

const sampleChallenge: FreeFallChallenge = {
  id: '1',
  title: 'Caída Libre: Altura del Edificio',
  subject: 'physics',
  topic: 'kinematics',
  difficulty: 'easy',
  kind: 'numeric_input',
  statement: 'Un objeto se deja caer desde un edificio de 45 metros de altura. ¿En cuántos segundos llegará al suelo? (Usa g = 10 m/s²)',
  payload: {
    gravity: 10,
    hasGravityField: true,
    heightMode: 'fixed',
    fallTime: true,
  } as FreeFallPayload,
  solution: {
    answer: 3,
    tolerance: 0.5,
    formula: 't = √(2h/g)',
  } as FreeFallSolution,
};

export default function PlayPage() {
  const [gameState, setGameState] = useState<'playing' | 'complete'>('playing');
  const [result, setResult] = useState<ChallengeResult | null>(null);

  const handleComplete = (gameResult: ChallengeResult) => {
    setResult(gameResult);
    setGameState('complete');
  };

  const handleRetry = () => {
    setResult(null);
    setGameState('playing');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{sampleChallenge.title}</h1>
          <p className="text-slate-300">{sampleChallenge.statement}</p>
        </div>

        {gameState === 'playing' ? (
          <FreeFallGame challenge={sampleChallenge} onComplete={handleComplete} />
        ) : (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-center">
            <div className={`text-6xl mb-4 ${result?.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {result?.isCorrect ? '✓' : '✗'}
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${result?.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {result?.isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </h2>
            <div className="text-slate-300 space-y-2 mb-8">
              <p>Puntaje: <span className="text-2xl font-bold text-white">{result?.score}</span></p>
              <p>Tiempo: <span className="text-white">{((result?.timeTakenMs ?? 0) / 1000).toFixed(1)}s</span></p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
              >
                Reintentar
              </button>
              <a
                href="/challenges"
                className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
              >
                Volver a Retos
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}