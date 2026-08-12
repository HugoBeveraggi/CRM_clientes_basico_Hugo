/**
 * Utility: formatting helpers — Mini CRM
 */

import i18n from '../i18n';

/**
 * Format a number as Euro currency.
 * @example formatCurrency(5000) → "5.000 €" / "€5,000"
 */
export function formatCurrency(value: number, lang?: string): string {
  const locale = (lang || i18n.language) === 'en' ? 'en-US' : 'es-ES';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a currency in compact notation for stat cards.
 * @example formatCurrencyCompact(1200000) → "1,2 M €"
 */
export function formatCurrencyCompact(value: number, lang?: string): string {
  const currentLang = lang || i18n.language;
  const locale = currentLang === 'en' ? 'en-US' : 'es-ES';
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 1 })} M €`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toLocaleString(locale, { maximumFractionDigits: 1 })} K €`;
  }
  return formatCurrency(value, currentLang);
}

/**
 * Format an ISO date string to a short human-readable date.
 * @example formatDate("2024-01-15T10:00:00Z") → "15 ene 2024"
 */
export function formatDate(isoString: string, lang?: string): string {
  const locale = (lang || i18n.language) === 'en' ? 'en-US' : 'es-ES';
  return new Date(isoString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Return a relative time string from an ISO date string.
 * @example "hace 3 días" / "3d ago"
 */
export function formatRelativeDate(isoString: string, lang?: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const isEn = (lang || i18n.language) === 'en';

  if (diffDays === 0) return isEn ? 'today' : 'hoy';
  if (diffDays === 1) return isEn ? 'yesterday' : 'ayer';
  if (diffDays < 7) return isEn ? `${diffDays}d ago` : `hace ${diffDays} días`;
  if (diffDays < 30) return isEn ? `${Math.floor(diffDays / 7)}w ago` : `hace ${Math.floor(diffDays / 7)} sem.`;
  if (diffDays < 365) return isEn ? `${Math.floor(diffDays / 30)}mo ago` : `hace ${Math.floor(diffDays / 30)} meses`;
  return isEn ? `${Math.floor(diffDays / 365)}y ago` : `hace ${Math.floor(diffDays / 365)} año(s)`;
}

/** Generate a UUID-like unique ID */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Truncate text to a maximum length with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}
