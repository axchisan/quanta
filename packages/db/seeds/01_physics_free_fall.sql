-- Seed data for MVP challenges
-- Physics: Free Fall challenges

BEGIN;

INSERT INTO challenges (slug, title, subject, topic, difficulty, kind, statement, payload, solution, is_predefined, status, published_at) VALUES
(
    'free-fall-easy-1',
    'Caída Libre: Altura del Edificio',
    'physics',
    'kinematics',
    'easy',
    'numeric_input',
    'Un objeto se deja caer desde un edificio de 45 metros de altura. ¿En cuántos segundos llegará al suelo? (Usa g = 10 m/s²)',
    '{"gravity": 10, "hasGravityField": true, "heightMode": "fixed", "fallTime": true}',
    '{"answer": 3, "tolerance": 0.1, "formula": "t = sqrt(2h/g)"}',
    true,
    'published',
    now()
),
(
    'free-fall-easy-2',
    'Caída Libre: Velocidad Final',
    'physics',
    'kinematics',
    'easy',
    'numeric_input',
    'Se deja caer una pelota desde una altura de 20 metros. ¿Cuál es su velocidad justo antes de tocar el suelo? (Usa g = 10 m/s²)',
    '{"gravity": 10, "hasGravityField": true, "velocityMode": "final"}',
    '{"answer": 20, "tolerance": 0.5, "formula": "v = sqrt(2gh)"}',
    true,
    'published',
    now()
),
(
    'free-fall-medium-1',
    'Caída Libre: Tiempo de Vuelo',
    'physics',
    'kinematics',
    'medium',
    'numeric_input',
    'Un astronauta en la Luna deja caer un objeto desde 180 metros. Si la gravedad lunar es 1.62 m/s², ¿cuántos segundos tarda en caer?',
    '{"gravity": 1.62, "hasGravityField": true, "heightMode": "fixed", "fallTime": true, "context": "moon"}',
    '{"answer": 14.9, "tolerance": 0.5, "formula": "t = sqrt(2h/g)"}',
    true,
    'published',
    now()
);

COMMIT;