'use client';

import { useState, useCallback } from 'react';

interface Element {
  symbol: string;
  count: number;
}

interface Compound {
  formula: string;
  elements: Element[];
}

interface EquationChallenge {
  id: string;
  statement: string;
  compounds: Compound[];
  coefficients: number[];
}

const sampleChallenges: EquationChallenge[] = [
  {
    id: 'chem-1',
    statement: 'Balancea la reacción: ___ H₂ + ___ O₂ → ___ H₂O',
    compounds: [
      { formula: 'H₂', elements: [{ symbol: 'H', count: 2 }] },
      { formula: 'O₂', elements: [{ symbol: 'O', count: 2 }] },
      { formula: 'H₂O', elements: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }] },
    ],
    coefficients: [2, 1, 2],
  },
  {
    id: 'chem-2',
    statement: 'Balancea: ___ N₂ + ___ H₂ → ___ NH₃',
    compounds: [
      { formula: 'N₂', elements: [{ symbol: 'N', count: 2 }] },
      { formula: 'H₂', elements: [{ symbol: 'H', count: 2 }] },
      { formula: 'NH₃', elements: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 3 }] },
    ],
    coefficients: [1, 3, 2],
  },
  {
    id: 'chem-3',
    statement: 'Balancea: ___ CH₄ + ___ O₂ → ___ CO₂ + ___ H₂O',
    compounds: [
      { formula: 'CH₄', elements: [{ symbol: 'C', count: 1 }, { symbol: 'H', count: 4 }] },
      { formula: 'O₂', elements: [{ symbol: 'O', count: 2 }] },
      { formula: 'CO₂', elements: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 2 }] },
      { formula: 'H₂O', elements: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }] },
    ],
    coefficients: [1, 2, 1, 2],
  },
];

export default function EquationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCoeffs, setUserCoeffs] = useState<number[]>([1, 1, 1]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  const challenge = sampleChallenges[currentIndex]!;

  const handleCoeffChange = useCallback((idx: number, value: number) => {
    const newCoeffs = [...userCoeffs];
    newCoeffs[idx] = Math.max(1, Math.min(10, value));
    setUserCoeffs(newCoeffs);
  }, [userCoeffs]);

  const checkAnswer = useCallback(() => {
    const correct = userCoeffs.every((c, i) => c === challenge.coefficients[i]);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const timeBonus = Math.max(0, 300 - (Date.now() - startTime) / 1000);
      setScore(500 + Math.round(timeBonus));
    }
  }, [userCoeffs, challenge.coefficients, startTime]);

  const nextChallenge = useCallback(() => {
    if (currentIndex < sampleChallenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserCoeffs([1, 1, 1]);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [currentIndex]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setUserCoeffs([1, 1, 1]);
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
  }, []);

  if (currentIndex >= sampleChallenges.length - 1 && showResult && isCorrect) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">¡Completado!</h1>
            <p className="text-2xl text-blue-400 mb-8">Puntaje: {score}</p>
            <button
              onClick={reset}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Balanceo de Ecuaciones</h1>
            <p className="text-slate-400">Problema {currentIndex + 1} de {sampleChallenges.length}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-400">{score}</p>
            <p className="text-slate-400 text-sm">puntos</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 mb-6">
          <h2 className="text-xl text-white mb-6 text-center">{challenge.statement}</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {challenge.compounds.map((compound, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {idx === 2 && <span className="text-slate-400 mb-2">→</span>}
                {idx > 2 && <span className="text-slate-400 mb-2">+</span>}
                <div className="bg-slate-700 rounded-lg p-4 min-w-[80px] text-center">
                  {idx < 3 && (
                    <div className="mb-2">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={userCoeffs[idx]}
                        onChange={(e) => handleCoeffChange(idx, parseInt(e.target.value) || 1)}
                        className="w-16 text-center text-xl font-bold bg-slate-600 text-white rounded border-2 border-blue-500 focus:border-blue-400 outline-none"
                      />
                    </div>
                  )}
                  <div className="text-lg text-white">{compound.formula}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all"
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={nextChallenge}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
              >
                Siguiente
              </button>
            )}
          </div>

          {showResult && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              isCorrect ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'
            }`}>
              <p className={isCorrect ? 'text-green-400 text-xl' : 'text-red-400 text-xl'}>
                {isCorrect ? '✓ ��Correcto!' : '✗ Incorrecto'}
              </p>
              {!isCorrect && (
                <p className="text-slate-300 mt-2">
                  La respuesta correcta es: {challenge.coefficients.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}