/**
 * LocalStorage storage helper — Mini CRM
 */

const STORAGE_KEY = 'crm_clients_v2';

/**
 * Persist any JSON-serializable value to localStorage.
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('[CRM] Failed to save to localStorage:', err);
  }
}

/**
 * Load and parse a JSON value from localStorage.
 * Returns `defaultValue` if the key is missing or parsing fails.
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error('[CRM] Failed to load from localStorage:', err);
    return defaultValue;
  }
}

export const CLIENTS_KEY = STORAGE_KEY;
