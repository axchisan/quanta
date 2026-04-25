export interface FreeFallChallenge {
  id: string;
  title: string;
  subject: 'physics';
  topic: 'kinematics';
  difficulty: 'easy' | 'medium' | 'hard';
  kind: 'numeric_input';
  statement: string;
  payload: FreeFallPayload;
  solution: FreeFallSolution;
}

export interface FreeFallPayload {
  gravity: number;
  hasGravityField: boolean;
  heightMode: 'fixed' | 'variable';
  fallTime?: boolean;
  velocityMode?: 'final' | 'initial';
  context?: string;
}

export interface FreeFallSolution {
  answer: number;
  tolerance: number;
  formula: string;
}

export interface ChallengeResult {
  score: number;
  isCorrect: boolean;
  timeTakenMs: number;
}

export interface EquationChallenge {
  id: string;
  title: string;
  subject: 'chemistry';
  topic: 'stoichiometry';
  difficulty: 'easy' | 'medium' | 'hard';
  kind: 'drag_coefficients';
  statement: string;
  payload: EquationPayload;
  solution: EquationSolution;
}

export interface EquationPayload {
  compounds: Compound[];
  targetCoefficients: number[];
  mode: 'balance' | 'identify';
}

export interface Compound {
  formula: string;
  elements: Element[];
}

export interface Element {
  symbol: string;
  count: number;
}

export interface EquationSolution {
  coefficients: number[];
  balancedEquation: string;
}