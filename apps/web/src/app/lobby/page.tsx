'use client';

import { useState, type ChangeEvent } from 'react';

export default function LobbyPage() {
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    console.log('Creating room...');
    setTimeout(() => setIsCreating(false), 1000);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) return;
    console.log('Joining room:', roomCode);
  };

  const onRoomCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value.toUpperCase());
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Sala de Juego</h1>
          <p className="text-slate-400">Crea una nueva sala o únete a una existente</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 space-y-6">
          <button
            onClick={handleCreateRoom}
            disabled={isCreating}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            {isCreating ? 'Creando...' : 'Crear Nueva Sala'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/50 text-slate-400">o</span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={roomCode}
              onChange={onRoomCodeChange}
              placeholder="Código de sala (ej: FIS-3B-7K)"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              maxLength={10}
            />
            <button
              onClick={handleJoinRoom}
              disabled={!roomCode.trim()}
              className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unirse a Sala
            </button>
          </div>
        </div>

        <div className="text-center">
          <a href="/" className="text-slate-400 hover:text-white transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}