# @quanta/ui — Shared UI Components

## Stack
- React
- Tailwind CSS v4
- shadcn/ui
- class-variance-authority
- clsx + tailwind-merge

## Scripts
```bash
pnpm build       # tsup
pnpm typecheck   # tsc --noEmit
```

## Convenciones
- Componentes en `src/`
- Exports en `src/index.ts`
- Usar `cn()` utility para clases
- Variants via `cva()`