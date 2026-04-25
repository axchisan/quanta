-- Seed data for Chemistry challenges
-- Equation Balancing challenges

BEGIN;

INSERT INTO challenges (slug, title, subject, topic, difficulty, kind, statement, payload, solution, is_predefined, status, published_at) VALUES
(
    'equation-balance-easy-1',
    'Balancea: Agua',
    'chemistry',
    'equation_balance',
    'easy',
    'drag_drop',
    'Balancea la siguiente ecuación arrastrando los coeficientes: H₂ + O₂ → H₂O',
    '{"equation": {"reactants": [{"element": "H", "subscript": 2}, {"element": "O", "subscript": 2}], "products": [{"element": "H", "subscript": 2}, {"element": "O", "subscript": 1}]}, "coefficients": [1, 2, 1, 2]}',
    '{"coefficients": {"H2": 2, "O2": 1, "H2O": 2}}',
    true,
    'published',
    now()
),
(
    'equation-balance-easy-2',
    'Balancea: Metano',
    'chemistry',
    'equation_balance',
    'easy',
    'drag_drop',
    'Balancea la siguiente ecuación: CH₄ + O₂ → CO₂ + H₂O',
    '{"equation": {"reactants": [{"element": "C", "subscript": 1}, {"element": "H", "subscript": 4}, {"element": "O", "subscript": 2}], "products": [{"element": "C", "subscript": 1}, {"element": "O", "subscript": 2}, {"element": "H", "subscript": 2}, {"element": "O", "subscript": 1}]}, "coefficients": [1, 1, 1, 1, 2]}',
    '{"coefficients": {"CH4": 1, "O2": 2, "CO2": 1, "H2O": 2}}',
    true,
    'published',
    now()
);

COMMIT;