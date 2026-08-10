/**
 * useLocalStorage hook — Mini CRM
 * Generic React hook that syncs state with localStorage.
 */

import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    loadFromStorage<T>(key, initialValue)
  );

  // Keep localStorage in sync on every state change
  useEffect(() => {
    saveToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
