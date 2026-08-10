/**
 * Kanban Constants — Mini CRM
 * Configuration for columns, colors, and column metadata.
 */

import type { ClientStatus } from '../types/client';

export interface KanbanColumnConfig {
  id: ClientStatus;
  title: string;
  colorClass: string;   // CSS class for status badge
  headerColor: string;  // Inline border-top color
  icon: string;         // Emoji icon for the column
  description: string;
}

/** Ordered list of Kanban pipeline columns */
export const KANBAN_COLUMNS: KanbanColumnConfig[] = [
  {
    id: 'new',
    title: 'Nuevo',
    colorClass: 'status-new',
    headerColor: '#63b3ed',
    icon: '✨',
    description: 'Clientes recién añadidos',
  },
  {
    id: 'contacted',
    title: 'Contactado',
    colorClass: 'status-contacted',
    headerColor: '#f6ad55',
    icon: '📞',
    description: 'En conversación inicial',
  },
  {
    id: 'proposal',
    title: 'Propuesta enviada',
    colorClass: 'status-proposal',
    headerColor: '#b794f6',
    icon: '📄',
    description: 'Propuesta formal enviada',
  },
  {
    id: 'won',
    title: 'Ganado',
    colorClass: 'status-won',
    headerColor: '#48bb78',
    icon: '🏆',
    description: 'Cliente convertido',
  },
  {
    id: 'lost',
    title: 'Perdido',
    colorClass: 'status-lost',
    headerColor: '#fc8181',
    icon: '💔',
    description: 'Oportunidad cerrada',
  },
];

/** Map for quick column lookup by ID */
export const KANBAN_COLUMN_MAP = new Map(
  KANBAN_COLUMNS.map((col) => [col.id, col])
);

/** All valid statuses in order */
export const ALL_STATUSES: ClientStatus[] = KANBAN_COLUMNS.map((c) => c.id);
