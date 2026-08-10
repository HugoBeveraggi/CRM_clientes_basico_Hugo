/**
 * useClients hook — Mini CRM
 * Core business logic: CRUD operations, filtering, sorting, and statistics.
 * Data is persisted to localStorage automatically via useLocalStorage.
 */

import { useMemo, useState } from 'react';
import type {
  Client,
  ClientFormData,
  ClientStatus,
  CRMStats,
  FiltersState,
} from '../types/client';
import { useLocalStorage } from './useLocalStorage';
import { CLIENTS_KEY } from '../utils/storage';
import { generateId } from '../utils/format';

// ---------------------------------------------------------------------------
// Seed data — shown on first load so the board isn't empty
// ---------------------------------------------------------------------------
const SEED_CLIENTS: Client[] = [
  {
    id: 'seed-1',
    name: 'Alejandro García',
    company: 'TechSolutions SL',
    phone: '+34 612 345 678',
    email: 'alejandro@techsolutions.es',
    expectedAmount: 24000,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    status: 'new',
    activities: [
      { id: 'act-1', type: 'note', date: new Date(Date.now() - 7 * 86400000).toISOString(), content: 'Interesado en el plan Enterprise. Tiene reunión pendiente.' },
      { id: 'act-2', type: 'reminder', date: new Date(Date.now() + 2 * 86400000).toISOString(), content: 'Llamar para confirmar reunión', completed: false }
    ],
  },
  {
    id: 'seed-2',
    name: 'Lucía Martínez',
    company: 'Innovare Digital',
    phone: '+34 623 456 789',
    email: 'lucia@innovare.com',
    expectedAmount: 8500,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    status: 'contacted',
    activities: [
      { id: 'act-3', type: 'call', date: new Date(Date.now() - 14 * 86400000).toISOString(), content: 'Llamada inicial realizada.' },
      { id: 'act-4', type: 'note', date: new Date(Date.now() - 13 * 86400000).toISOString(), content: 'Espera confirmación de presupuesto.' }
    ],
  },
  {
    id: 'seed-3',
    name: 'Carlos Rodríguez',
    company: 'Grupo Meridian',
    phone: '+34 634 567 890',
    email: 'carlos.r@meridian.es',
    expectedAmount: 45000,
    createdAt: new Date(Date.now() - 21 * 86400000).toISOString(),
    status: 'proposal',
    activities: [
      { id: 'act-5', type: 'email', date: new Date(Date.now() - 21 * 86400000).toISOString(), content: 'Propuesta enviada el lunes.' },
      { id: 'act-6', type: 'reminder', date: new Date(Date.now() - 1 * 86400000).toISOString(), content: 'Preguntar si han tomado una decisión', completed: false }
    ],
  },
  {
    id: 'seed-4',
    name: 'Sara López',
    company: 'BioNext Laboratories',
    phone: '+34 645 678 901',
    email: 'sara@bionext.com',
    expectedAmount: 62000,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    status: 'won',
    activities: [
      { id: 'act-7', type: 'meeting', date: new Date(Date.now() - 30 * 86400000).toISOString(), content: 'Contrato firmado. Inicio del proyecto en febrero.' }
    ],
  },
  {
    id: 'seed-5',
    name: 'Marcos Fernández',
    company: 'Retail Express',
    phone: '+34 656 789 012',
    email: 'marcos@retailexpress.es',
    expectedAmount: 12000,
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    status: 'lost',
    activities: [
      { id: 'act-8', type: 'note', date: new Date(Date.now() - 45 * 86400000).toISOString(), content: 'Eligieron a un competidor. Mantener contacto para el año que viene.' }
    ],
  },
  {
    id: 'seed-6',
    name: 'Ana Torres',
    company: 'Creativa Studio',
    phone: '+34 667 890 123',
    email: 'ana@creativastudio.com',
    expectedAmount: 5500,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: 'new',
    activities: [
      { id: 'act-9', type: 'note', date: new Date(Date.now() - 3 * 86400000).toISOString(), content: 'Lead obtenido desde la web. Por contactar.' }
    ],
  },
  {
    id: 'seed-7',
    name: 'Diego Sánchez',
    company: 'FinancePro',
    phone: '+34 678 901 234',
    email: 'diego@financepro.es',
    expectedAmount: 31000,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    status: 'contacted',
    activities: [
      { id: 'act-10', type: 'meeting', date: new Date(Date.now() - 10 * 86400000).toISOString(), content: 'Demo realizada con éxito. Enviando propuesta próxima semana.' }
    ],
  },
];

// ---------------------------------------------------------------------------
// Default filters
// ---------------------------------------------------------------------------
const DEFAULT_FILTERS: FiltersState = {
  search: '',
  status: 'all',
  sortField: 'createdAt',
  sortDirection: 'desc',
  minAmount: '',
  maxAmount: '',
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useClients() {
  const [clients, setClients] = useLocalStorage<Client[]>(
    CLIENTS_KEY,
    SEED_CLIENTS
  );
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  // ── CRUD ──────────────────────────────────────────────────────────────────

  /** Add a new client */
  const addClient = (data: ClientFormData): Client => {
    const newClient: Client = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  /** Update an existing client by ID */
  const updateClient = (id: string, data: Partial<ClientFormData>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  /** Delete a client by ID */
  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  /** Move a client to a different status column (drag & drop) */
  const moveClient = (id: string, newStatus: ClientStatus) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  // ── FILTERS & SEARCH ──────────────────────────────────────────────────────

  /** Update a specific filter field */
  const setFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /** Reset all filters to defaults */
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // ── DERIVED DATA ──────────────────────────────────────────────────────────

  /** Filtered and sorted client list */
  const filteredClients = useMemo(() => {
    let result = [...clients];

    // Text search (name, company, email)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter((c) => c.status === filters.status);
    }

    // Amount range
    if (filters.minAmount !== '') {
      const min = parseFloat(filters.minAmount);
      if (!isNaN(min)) result = result.filter((c) => c.expectedAmount >= min);
    }
    if (filters.maxAmount !== '') {
      const max = parseFloat(filters.maxAmount);
      if (!isNaN(max)) result = result.filter((c) => c.expectedAmount <= max);
    }

    // Sorting
    result.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      switch (filters.sortField) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'company':
          valA = a.company.toLowerCase();
          valB = b.company.toLowerCase();
          break;
        case 'expectedAmount':
          valA = a.expectedAmount;
          valB = b.expectedAmount;
          break;
        case 'createdAt':
        default:
          valA = a.createdAt;
          valB = b.createdAt;
          break;
      }

      if (valA < valB) return filters.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [clients, filters]);

  /** Clients grouped by status column */
  const clientsByStatus = useMemo(() => {
    const map = new Map<ClientStatus, Client[]>();
    const statuses: ClientStatus[] = ['new', 'contacted', 'proposal', 'won', 'lost'];
    statuses.forEach((s) => map.set(s, []));

    filteredClients.forEach((c) => {
      const group = map.get(c.status);
      if (group) group.push(c);
    });

    return map;
  }, [filteredClients]);

  /** Dashboard statistics (computed over ALL clients, not filtered) */
  const stats: CRMStats = useMemo(() => {
    const won = clients.filter((c) => c.status === 'won');
    const lost = clients.filter((c) => c.status === 'lost');
    const active = clients.filter((c) => c.status !== 'lost');
    const totalRevenue = active.reduce((sum, c) => sum + c.expectedAmount, 0);
    const closedTotal = won.length + lost.length;

    return {
      totalClients: clients.length,
      totalPotentialRevenue: totalRevenue,
      wonClients: won.length,
      lostClients: lost.length,
      conversionRate:
        closedTotal > 0 ? Math.round((won.length / closedTotal) * 100) : 0,
      activeClients: active.length,
    };
  }, [clients]);

  return {
    clients,
    filteredClients,
    clientsByStatus,
    stats,
    filters,
    setFilter,
    resetFilters,
    addClient,
    updateClient,
    deleteClient,
    moveClient,
  };
}
