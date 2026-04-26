'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  statement: string;
  answer: number;
  tolerance: number;
  formula: string;
}

const sampleChallenge: Challenge = {
  id: '1',
  title: 'Caída Libre: Altura del Edificio',
  statement: 'Un objeto se deja caer desde un edificio de 45 metros de altura. ¿En cuántos segundos llegará al suelo? (Usa g = 10 m/s²)',
  answer: 3,
  tolerance: 0.5,
  formula: 't = √(2h/g) = √(90/10) = √9 = 3s',
};

export default function PlayPage() {
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const userNum = parseFloat(userAnswer);
    const diff = Math.abs(userNum - sampleChallenge.answer);
    const correct = diff <= sampleChallenge.tolerance;
    
    setIsCorrect(correct);
    setShowResult(true);
  }, [userAnswer]);

  const handleRetry = useCallback(() => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/challenges" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Volver a desafíos
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">{sampleChallenge.title}</h1>
          <p className="text-slate-300 mt-2">{sampleChallenge.statement}</p>
        </div>

        {!showResult ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-400 mb-2">
                Tu respuesta (segundos):
              </label>
              <input
                type="number"
                step="0.1"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="ej: 3.0"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white text-xl text-center focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
            >
              Verificar Respuesta
            </button>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-slate-400 text-sm">
                Fórmula: <code className="text-blue-400">{sampleChallenge.formula}</code>
              </p>
            </div>
          </form>
        ) : (
          <div className={`rounded-2xl p-8 border text-center ${
            isCorrect 
              ? 'bg-green-900/30 border-green-600' 
              : 'bg-red-900/30 border-red-600'
          }`}>
            <div className={`text-6xl mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '✓' : '✗'}
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </h2>
            
            {!isCorrect && (
              <p className="text-slate-300 mb-4">
                La respuesta correcta es: <span className="text-white font-bold">{sampleChallenge.answer} segundos</span>
              </p>
            )}
            
            <p className="text-slate-400 text-sm mb-6">
              {sampleChallenge.formula}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
              >
                Reintentar
              </button>
              <Link
                href="/challenges"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
              >
                Volver a Retos
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}