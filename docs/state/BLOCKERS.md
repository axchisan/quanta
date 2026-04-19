# Blockers activos

> **Cómo se usa:**
> - Cualquier agente registra acá cuando una task se bloquea esperando algo (otro agente, decisión humana, dependencia externa).
> - **Coordinador** revisa diariamente y media/escala.
> - Cuando un blocker se resuelve, marcar `RESUELTO` con fecha y mover a sección "Resueltos recientes" (limpiar después de 1-2 sprints).
> - Etiquetas: `[ESCALATION]` para cosas que requieren atención del humano, `[BLOCKED]` para deps cross-agente, `[EXT]` para deps externas.

---

## Activos

(Ninguno al iniciar Sprint 0.)

---

## Resueltos recientes

(Vacío.)

---

## Plantilla

```markdown
### B<id> — Título corto del blocker
- **Tipo:** [BLOCKED] | [ESCALATION] | [EXT]
- **Reportado:** YYYY-MM-DD por <rol>
- **Task afectada:** T<id>
- **Bloquea a:** <rol/persona>
- **Esperando:** <qué se necesita para desbloquear>
- **Notas:** <contexto adicional, links, etc.>
```
