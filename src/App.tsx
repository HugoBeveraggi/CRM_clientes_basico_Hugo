/**
 * App — Mini CRM Visual
 * Root component that wires all features together:
 *   - Header with search + filters
 *   - Stats bar
 *   - Kanban board with drag & drop
 *   - Client create/edit modal
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/layout/Header';
import { StatsBar } from './components/stats/StatsBar';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { Dashboard } from './components/stats/Dashboard';
import { ClientModal } from './components/clients/ClientModal';
import { useClients } from './hooks/useClients';
import type { Client, ClientFormData, ClientStatus } from './types/client';
import { LayoutGrid, BarChart2 } from 'lucide-react';

const App: React.FC = () => {
  const {
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
    clients,
  } = useClients();

  const { t } = useTranslation();

  // ── View state ─────────────────────────────────────────────────────────────
  const [activeView, setActiveView] = useState<'kanban' | 'dashboard'>('kanban');

  // ── Modal state ────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [defaultModalStatus, setDefaultModalStatus] = useState<ClientStatus>('new');

  // ── Modal handlers ─────────────────────────────────────────────────────────

  const openAddModal = useCallback((status: ClientStatus = 'new') => {
    setEditingClient(null);
    setDefaultModalStatus(status);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((client: Client) => {
    setEditingClient(client);
    setDefaultModalStatus(client.status);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing editing client for exit animation
    setTimeout(() => setEditingClient(null), 300);
  }, []);

  const handleSave = useCallback(
    (data: ClientFormData) => {
      if (editingClient) {
        updateClient(editingClient.id, data);
      } else {
        addClient(data);
      }
    },
    [editingClient, updateClient, addClient]
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh bg-[var(--color-bg)]">
      {/* Sticky top navigation */}
      <Header
        filters={filters}
        onFilterChange={setFilter}
        onResetFilters={resetFilters}
        onAddClient={() => openAddModal()}
        totalFiltered={filteredClients.length}
        totalAll={clients.length}
      />

      {/* Main content area */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* KPI statistics */}
        <section aria-label="Estadísticas del pipeline">
          <StatsBar stats={stats} />
        </section>

        {/* Section header & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              {t('app.pipelineTitle')}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              {filteredClients.length === clients.length
                ? t('app.totalClients', { count: clients.length })
                : t('app.showingClients', { filtered: filteredClients.length, total: clients.length })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-[var(--color-card)] p-1 rounded-lg border border-[var(--color-border)]">
              <button
                onClick={() => setActiveView('kanban')}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${activeView === 'kanban' 
                    ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-sm' 
                    : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
                  }
                `}
              >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Tablero</span>
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${activeView === 'dashboard' 
                    ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-sm' 
                    : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
                  }
                `}
              >
                <BarChart2 size={16} />
                <span className="hidden sm:inline">Estadísticas</span>
              </button>
            </div>

            {/* Quick add shortcut indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-[var(--color-text-dim)] ml-2 border-l border-[var(--color-border)] pl-4">
              <kbd className="px-1.5 py-0.5 bg-[var(--color-card)] border border-[var(--color-border)] rounded text-[10px]">
                +
              </kbd>
              <span>{t('app.addShortcut')}</span>
            </div>
          </div>
        </div>

        {/* Main Content (Kanban or Dashboard) */}
        <section aria-label="Contenido Principal">
          {activeView === 'kanban' ? (
            <KanbanBoard
              clientsByStatus={clientsByStatus}
              onAddClient={openAddModal}
              onEditClient={openEditModal}
              onDeleteClient={deleteClient}
              onMoveClient={moveClient}
            />
          ) : (
            <Dashboard clients={filteredClients} />
          )}
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-dim)]">
          <span>
            {t('app.footerStorage')}
          </span>
          <span>
            {t('app.footerDeveloped', { year: new Date().getFullYear() })}
          </span>
        </footer>
      </main>

      {/* Client create/edit modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        client={editingClient}
        defaultStatus={defaultModalStatus}
      />
    </div>
  );
};

export default App;
