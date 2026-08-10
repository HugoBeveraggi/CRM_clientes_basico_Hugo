/**
 * KanbanColumn — Mini CRM
 * A droppable column representing one pipeline status.
 * Uses @dnd-kit/sortable for intra-column reordering.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { Client, ClientStatus } from '../../types/client';
import type { KanbanColumnConfig } from '../../constants/kanban';
import { KanbanCard } from './KanbanCard';
import { formatCurrency } from '../../utils/format';

interface KanbanColumnProps {
  config: KanbanColumnConfig;
  clients: Client[];
  onAddClient: (status: ClientStatus) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
  onMoveClient: (id: string, newStatus: ClientStatus) => void;
  isOver?: boolean;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  config,
  clients,
  onAddClient,
  onEditClient,
  onDeleteClient,
  onMoveClient,
}) => {
  const { t } = useTranslation();
  const { setNodeRef, isOver } = useDroppable({ id: config.id });

  const totalAmount = clients.reduce((sum, c) => sum + c.expectedAmount, 0);
  const clientIds = clients.map((c) => c.id);

  return (
    <div
      className="
        flex flex-col flex-shrink-0 w-72
        bg-[var(--color-surface)] rounded-[var(--radius-lg)]
        border border-[var(--color-border)]
        overflow-hidden
        transition-colors duration-[var(--transition-fast)]
      "
      style={isOver ? { borderColor: config.headerColor, background: `${config.headerColor}08` } : {}}
    >
      {/* Column header */}
      <div
        className="px-4 pt-4 pb-3"
        style={{ borderTop: `3px solid ${config.headerColor}` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-base">{config.icon}</span>
            <h2 className="text-sm font-semibold text-[var(--color-text)]">
              {t(`kanban.columns.${config.id}`)}
            </h2>
          </div>
          {/* Count badge */}
          <span
            className="
              inline-flex items-center justify-center
              min-w-[22px] h-[22px] px-1.5
              rounded-full text-xs font-bold
              bg-[var(--color-card)] text-[var(--color-text-muted)]
              border border-[var(--color-border)]
            "
          >
            {clients.length}
          </span>
        </div>

        {/* Column total amount */}
        {clients.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-dim)]">
              {config.description}
            </span>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: config.headerColor }}
            >
              {formatCurrency(totalAmount)}
            </span>
          </div>
        )}
      </div>

      {/* Cards list (droppable + sortable) */}
      <SortableContext items={clientIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`
            kanban-column-scroll flex-1
            px-3 pt-1 space-y-2 min-h-[120px]
            transition-colors duration-[var(--transition-fast)]
            ${isOver ? 'drop-target-highlight' : ''}
          `}
        >
          {clients.length === 0 && (
            <div className="
              flex flex-col items-center justify-center
              py-8 px-4 text-center
              border-2 border-dashed border-[var(--color-border)]
              rounded-[var(--radius-md)]
              text-[var(--color-text-dim)] text-xs
              transition-colors duration-[var(--transition-fast)]
            "
            style={isOver ? { borderColor: config.headerColor, color: config.headerColor } : {}}
            >
              <span className="text-2xl mb-1.5">{config.icon}</span>
              <span>{t('kanban.emptyColumn')}</span>
            </div>
          )}

          {clients.map((client) => (
            <KanbanCard
              key={client.id}
              client={client}
              onEdit={onEditClient}
              onDelete={onDeleteClient}
              onMove={onMoveClient}
            />
          ))}
        </div>
      </SortableContext>

      {/* Add client button */}
      <div className="p-3 pt-2 border-t border-[var(--color-border)]/50">
        <button
          onClick={() => onAddClient(config.id)}
          className="
            w-full flex items-center justify-center gap-2
            py-2 px-3 rounded-[var(--radius-md)]
            text-xs text-[var(--color-text-dim)]
            hover:text-[var(--color-text)]
            hover:bg-[var(--color-card)]
            border border-dashed border-[var(--color-border)]
            hover:border-[var(--color-accent)]/50
            transition-all duration-[var(--transition-fast)]
            cursor-pointer
            group
          "
          aria-label={t('app.newClient')}
        >
          <Plus
            size={14}
            className="group-hover:text-[var(--color-accent)] transition-colors"
          />
          <span>{t('app.newClient')}</span>
        </button>
      </div>
    </div>
  );
};
