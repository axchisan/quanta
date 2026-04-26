import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Challenge {
  id: string;
  title: string;
  subject: 'physics' | 'chemistry';
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  kind: 'numeric_input' | 'drag_coefficients' | 'multiple_choice';
  statement: string;
  payload?: Record<string, unknown>;
  solution?: Record<string, unknown>;
  created_at?: string;
}

export async function getChallenges(): Promise<Challenge[]> {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('difficulty', { ascending: true })
    .limit(20);

  if (error) {
    console.error('Error loading challenges:', error);
    return [];
  }

  return data || [];
}

export async function getChallengeById(id: string): Promise<Challenge | null> {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error loading challenge:', error);
    return null;
  }

  return data;
}