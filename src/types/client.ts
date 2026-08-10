/**
 * Client Types — Mini CRM
 * Defines all TypeScript interfaces and types for the CRM domain model.
 */

/** Available Kanban pipeline statuses */
export type ClientStatus = 'new' | 'contacted' | 'proposal' | 'won' | 'lost';

/** Activity types */
export type ActivityType = 'note' | 'call' | 'email' | 'meeting' | 'reminder';

export interface Activity {
  id: string;
  type: ActivityType;
  date: string;       // ISO date string
  content: string;
  completed?: boolean; // Only for 'reminder' type
}

/** Full client model */
export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  expectedAmount: number;
  createdAt: string;    // ISO date string
  status: ClientStatus;
  activities: Activity[];
}

/** Shape used for creating or editing a client (omits server-managed fields) */
export type ClientFormData = Omit<Client, 'id' | 'createdAt'>;

/** Sort field options */
export type SortField = 'name' | 'company' | 'expectedAmount' | 'createdAt';

/** Sort direction */
export type SortDirection = 'asc' | 'desc';

/** Active filters state */
export interface FiltersState {
  search: string;
  status: ClientStatus | 'all';
  sortField: SortField;
  sortDirection: SortDirection;
  minAmount: string;
  maxAmount: string;
}

/** Dashboard statistics */
export interface CRMStats {
  totalClients: number;
  totalPotentialRevenue: number;
  wonClients: number;
  lostClients: number;
  conversionRate: number;
  activeClients: number;
}
