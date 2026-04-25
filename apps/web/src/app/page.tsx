import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Quanta
        </h1>
        <p className="text-xl text-slate-300">
          Aprende Física y Química jugando. Retos generados con IA, competencias multiplayer y más.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/lobby"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            Crear Sala
          </Link>
          <Link
            href="/challenges"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all hover:scale-105 border border-slate-700"
          >
            Explorar Retos
          </Link>
        </div>
      </div>
    </main>
  );
}