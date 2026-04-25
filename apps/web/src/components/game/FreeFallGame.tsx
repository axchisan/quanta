'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { FreeFallScene } from '@/lib/game/FreeFallScene';
import type { FreeFallChallenge, ChallengeResult } from '@/lib/game/types';

interface FreeFallGameProps {
  challenge: FreeFallChallenge;
  onComplete: (result: ChallengeResult) => void;
}

export function FreeFallGame({ challenge, onComplete }: FreeFallGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current,
      backgroundColor: '#1a1a2e',
      scene: [FreeFallScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    const timeout = setTimeout(() => {
      const scene = gameRef.current?.scene.getScene('FreeFallScene') as FreeFallScene;
      if (scene) {
        scene.scene.restart({ challenge, onComplete });
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [challenge, onComplete]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl overflow-hidden border-2 border-slate-600 shadow-2xl">
        <div 
          ref={containerRef} 
          className="game-container"
          style={{ width: 800, height: 600 }}
        />
      </div>
    </div>
  );
}