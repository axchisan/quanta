import Link from 'next/link';
import { Suspense } from 'react';

interface Challenge {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  kind: string;
  statement: string;
}

const fallbackChallenges: Challenge[] = [
  {
    id: 'freefall-1',
    title: 'Caída Libre: Altura del Edificio',
    subject: 'physics',
    topic: 'kinematics',
    difficulty: 'easy',
    kind: 'numeric_input',
    statement: 'Un objeto se deja caer desde 45m. g=10m/s². ¿Tiempo?',
  },
  {
    id: 'equation-1',
    title: 'Balancea: H₂ + O₂ → H₂O',
    subject: 'chemistry',
    topic: 'stoichiometry',
    difficulty: 'easy',
    kind: 'drag_coefficients',
    statement: 'Balancea la ecuación: H₂ + O₂ → H₂O',
  },
  {
    id: 'freefall-2',
    title: 'Caída Libre: Torre de 20m',
    subject: 'physics',
    topic: 'kinematics',
    difficulty: 'medium',
    kind: 'numeric_input',
    statement: 'Desde 20m de altura. g=10m/s². ¿Velocidad final?',
  },
  {
    id: 'equation-2',
    title: 'Balancea: N₂ + H₂ → NH₃',
    subject: 'chemistry',
    topic: 'stoichiometry',
    difficulty: 'medium',
    kind: 'drag_coefficients',
    statement: 'Balancea: N₂ + H₂ → NH₃ (Haber)',
  },
];

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const subjectColors: Record<string, string> = {
    physics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    chemistry: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const difficultyColors: Record<string, string> = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  };

  const gameUrl = challenge.kind === 'numeric_input' 
    ? `/play/${challenge.id}` 
    : '/equation';

  return (
    <Link href={gameUrl}>
      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs border ${subjectColors[challenge.subject]}`}>
            {challenge.subject}
          </span>
          <span className={`text-xs ${difficultyColors[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
        <p className="text-slate-400 text-sm">{challenge.statement}</p>
      </div>
    </Link>
  );
}

function ChallengeSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-1/3 mb-3"></div>
      <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-slate-700 rounded w-2/3"></div>
    </div>
  );
}

async function ChallengeList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {fallbackChallenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}

export default function ChallengesPage() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Retos Disponibles</h1>
          <p className="text-slate-400">Explora y juega retos de Física y Química</p>
        </div>

        <Suspense fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((i) => <ChallengeSkeleton key={i} />)}
          </div>
        }>
          <ChallengeList />
        </Suspense>

        <div className="mt-8 text-center">
          <a href="/" className="text-slate-400 hover:text-white transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}