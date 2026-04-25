# @quanta/game-engine — Phaser 3 Game Engine

## Stack
- Phaser 3.80
- Vite
- TypeScript

## Scripts
```bash
pnpm dev         # Vite dev server
pnpm build       # Build bundle
pnpm test        # Vitest
pnpm typecheck   # tsc --noEmit
```

## Escenas
- `BootScene` — precarga de assets
- `MenuScene` — menú principal
- `ChallengeScene` — escena de reto activo
- `ResultsScene` — pantalla de resultados

## Estructura
- `src/scenes/` — escenas del juego
- `src/components/` — sprites, física, animaciones
- `src/assets/` — assets estáticos