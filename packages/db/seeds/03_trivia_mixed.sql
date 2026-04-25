-- Seed data for Trivia challenges
-- Mixed physics/chemistry questions

BEGIN;

INSERT INTO challenges (slug, title, subject, topic, difficulty, kind, statement, payload, solution, is_predefined, status, published_at) VALUES
(
    'trivia-physics-1',
    'Primera Ley de Newton',
    'physics',
    'laws_of_motion',
    'easy',
    'multiple_choice',
    '¿Qué describe la Primera Ley de Newton (Ley de Inercia)?',
    '{"options": [{"id": "A", "text": "La fuerza es igual a masa por aceleración"}, {"id": "B", "text": "Todo cuerpo permanece en su estado de reposo o movimiento uniforme unless una fuerza externa actúa"}, {"id": "C", "text": "A toda acción le corresponde una reacción igual y opuesta"}, {"id": "D", "text": "La energía no se crea ni se destruye, solo se transforma"}]}',
    '{"correctAnswer": "B"}',
    true,
    'published',
    now()
),
(
    'trivia-chemistry-1',
    'Tabla Periódica',
    'chemistry',
    'periodic_table',
    'easy',
    'multiple_choice',
    '¿Cuántos elementos tiene la tabla periódica actual?',
    '{"options": [{"id": "A", "text": "112"}, {"id": "B", "text": "118"}, {"id": "C", "text": "126"}, {"id": "D", "text": "92"}]}',
    '{"correctAnswer": "B"}',
    true,
    'published',
    now()
);

COMMIT;