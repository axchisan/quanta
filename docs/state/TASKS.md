# Tasks — Cola priorizada

> **Cómo se usa:**
> - Cada task sigue el formato de `templates/task.md`.
> - Solo el **Coordinador** crea, prioriza, asigna y borra tasks.
> - Especialistas SOLO cambian el campo `status` de su propia task (`pending` → `in_progress` → `done`).
> - Tasks ordenadas por prioridad de ejecución (las primeras se trabajan primero).
> - `id` formato: `T<número>` zero-padded a 3 dígitos.
> - `blockedBy`: lista de task IDs que deben cerrarse antes.

---

## Pendientes / En progreso

(Todas las tareas de Sprint 0 completadas. Ver sección "Done".)

---

## Done

### Sprint 0 — Foundations (2026-04-25)
| ID | Task | Owner | Status |
|---|------|-------|--------|
| T001 | Scaffolding monorepo (pnpm + Turborepo) | coordinator | done |
| T002 | CI básica en GitHub Actions | coordinator | done |
| T003 | Skeleton apps/web (Next.js 15) | ui-web | done |
| T004 | Skeleton apps/game-server (Colyseus) | backend-realtime | done |
| T005 | Skeleton packages/game-engine (Phaser) | game-engine | done |
| T006 | Skeleton packages/ai-gateway | ai-gateway | done |
| T007 | Skeleton packages/db (esquema + migración) | backend-realtime | done |

### Sprint 1 — MVP Jugable (2026-05-02)
| ID | Task | Owner | Status |
|---|------|-------|--------|
| T101 | Reto Caída Libre (simple HTML) | coordinator | done |
| T102 | Reto Balanceo de Ecuaciones | coordinator | done |
| T103 | Tipos Trivia IA + stub generator | coordinator | done |
| T104 | Sistema de puntaje (zustand) | coordinator | done |
| T105 | Conectar botones de retos a páginas | coordinator | done |

---

## Backlog (sin sprint asignado)

- **B002** — Configurar deploy en Coolify para apps/web (auto-deploy on push to main). ✅ HECHO
- **B007** — Implementar reto Caída Libre (Fase 1). ✅ HECHO (simple HTML)
- **B008** — Implementar reto Balanceo de Ecuaciones (Fase 1). ✅ HECHO
- **B009** — Implementar reto Trivia Mixta IA (Fase 1). 🔄 PARCIAL (tipos hechos, UI pendiente)
- **B010** — Configurar Pollinations.ai provider en ai-gateway.
- **B011** — Configurar Gemini provider en ai-gateway.
- **B012** — Configurar ElevenLabs / Coqui TTS provider en ai-gateway.
- **B013** — Implementar cache Supabase para ai-gateway.
- **B014** — Implementar Edge Function `validate-attempt`.
- **B015** — Configurar Colyseus server en Coolify.
- **B016** — Implementar UI de lobby/salas.
- **B017** — Implementar PWA manifest + service worker (Fase 4).
- **B018** — Configurar Capacitor para Android (Fase 4).

## Tareas próximas para Sprint 1

1. **Más retos jugables** — Agregar más desafíos de ejemplo
2. **Integrar Supabase** — Conectar retos a DB real
3. **Chat/Audio IA** — Feedback con IA en resultados
