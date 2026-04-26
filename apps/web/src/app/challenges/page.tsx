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

async function getChallenges(): Promise<Challenge[]> {
  // Placeholder - will connect to Supabase later
  return [
    {
      id: '1',
      title: 'Caída Libre: Altura del Edificio',
      subject: 'physics',
      topic: 'kinematics',
      difficulty: 'easy',
      kind: 'numeric_input',
      statement: 'Un objeto se deja caer desde un edificio de 45 metros...',
    },
    {
      id: '2',
      title: 'Balancea: Agua',
      subject: 'chemistry',
      topic: 'equation_balance',
      difficulty: 'easy',
      kind: 'drag_drop',
      statement: 'Balancea la siguiente ecuación: H₂ + O₂ → H₂O',
    },
  ];
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const subjectColors = {
    physics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    chemistry: 'bg-green-500/20 text-green-400 border-green-500/30',
    mixed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs border ${subjectColors[challenge.subject as keyof typeof subjectColors]}`}>
          {challenge.subject}
        </span>
        <span className={`text-xs ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}>
          {challenge.difficulty}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
      <p className="text-slate-400 text-sm">{challenge.statement}</p>
      <Link 
          href={challenge.kind === 'numeric_input' ? `/play/${challenge.id}` : `/equation`}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors block text-center"
        >
          Jugar
        </Link>
    </div>
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
  const challenges = await getChallenges();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {challenges.map((challenge) => (
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
            {[1, 2, 3, 4, 5, 6].map((i) => <ChallengeSkeleton key={i} />)}
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