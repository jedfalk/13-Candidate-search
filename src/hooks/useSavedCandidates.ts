// src/hooks/useSavedCandidates.ts
import { useEffect, useState } from 'react';

export interface Candidate {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
}

const LOCAL_STORAGE_KEY = 'savedCandidates';

export const useSavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  const saveCandidate = (candidate: Candidate) => {
    const exists = savedCandidates.find(c => c.id === candidate.id);
    if (!exists) {
      const updated = [...savedCandidates, candidate];
      setSavedCandidates(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const removeCandidate = (id: number) => {
    const updated = savedCandidates.filter(c => c.id !== id);
    setSavedCandidates(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    savedCandidates,
    saveCandidate,
    removeCandidate,
  };
};
