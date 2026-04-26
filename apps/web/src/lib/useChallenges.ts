'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Challenge {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  kind: string;
  statement: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const fallbackChallenges: Challenge[] = [
  { id: 'freefall-1', title: 'Caída Libre: 45m', subject: 'physics', topic: 'kinematics', difficulty: 'easy', kind: 'numeric_input', statement: 'g=10m/s², ¿tiempo?' },
  { id: 'equation-1', title: 'H₂ + O₂ → H₂O', subject: 'chemistry', topic: 'stoichiometry', difficulty: 'easy', kind: 'drag_coefficients', statement: 'Balancea' },
];

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabaseUrl || !supabaseAnonKey) {
        setChallenges(fallbackChallenges);
        setLoading(false);
        return;
      }

      try {
        const sb = createClient(supabaseUrl, supabaseAnonKey);
        const { data } = await sb.from('challenges').select('*').order('difficulty').limit(20);
        if (data && data.length > 0) {
          setChallenges(data);
        } else {
          setChallenges(fallbackChallenges);
        }
      } catch {
        setChallenges(fallbackChallenges);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { challenges, loading };
}