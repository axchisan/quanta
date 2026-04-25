# @quanta/game-server — Colyseus Game Server

## Stack
- Colyseus 0.15
- Express
- Node.js 22
- TypeScript

## Scripts
```bash
pnpm dev         # tsx watch
pnpm build       # tsc
pnpm start       # node dist/
pnpm typecheck   # tsc --noEmit
```

## Rooms
- `LobbyRoom` — sala de espera/lobby
- `KahootRoom` — reto competitivo tipo Kahoot
- `DuelRoom` — duelo 1v1

## Puerto
- Desarrollo: 2567
- Producción: 2567