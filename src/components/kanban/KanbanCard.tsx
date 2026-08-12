/**
 * KanbanCard — Mini CRM
 * Draggable client card for the Kanban board.
 * Shows key client info at a glance with quick action buttons.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Building2,
  Phone,
  Mail,
  Calendar,
  GripVertical,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft,
  Bell,
} from 'lucide-react';
import type { Client, ClientStatus } from '../../types/client';
import { formatCurrency, formatRelativeDate } from '../../utils/format';

interface KanbanCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
  onMove?: (id: string, newStatus: ClientStatus) => void;
  isDragging?: boolean;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  client,
  onEdit,
  onDelete,
  onMove,
  isDragging = false,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: client.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.4 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmDelete) {
      onDelete(client.id);
    } else {
      setConfirmDelete(true);
      // Auto-cancel confirm after 3 seconds
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(client);
  };

  const activities = client.activities || [];
  const pendingReminders = activities.filter(a => a.type === 'reminder' && !a.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextReminder = pendingReminders[0];
  const isOverdue = nextReminder && new Date(nextReminder.date) < new Date(new Date().setHours(0,0,0,0));

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-[var(--color-card)] border border-[var(--color-border)]
        rounded-[var(--radius-md)] overflow-hidden
        hover-card group animate-fade-in
        ${isDragging ? 'drag-overlay' : ''}
        ${isSortableDragging ? 'opacity-40' : ''}
      `}
    >
      {/* Card header row */}
      <div className="flex items-start gap-2 p-3 pb-2">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="
            flex-shrink-0 mt-0.5 p-0.5 cursor-grab active:cursor-grabbing
            text-[var(--color-text-dim)] hover:text-[var(--color-accent)]
            rounded transition-colors duration-[var(--transition-fast)]
            opacity-0 group-hover:opacity-100
          "
          aria-label={t('client.card.dragCard')}
        >
          <GripVertical size={14} />
        </button>

        {/* Client info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-1.5 leading-tight">
            <span className="truncate">{client.name}</span>
            {nextReminder && (
              <Bell size={12} className={`flex-shrink-0 ${isOverdue ? 'text-red-500 fill-red-500' : 'text-rose-500 fill-rose-500'}`} />
            )}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Building2 size={11} className="text-[var(--color-text-dim)] flex-shrink-0" />
            <span className="text-xs text-[var(--color-text-muted)] truncate">
              {client.company}
            </span>
          </div>
        </div>

        {/* Amount badge */}
        <div className="flex-shrink-0 text-right">
          <span className="text-sm font-bold text-[var(--color-accent-light)] tabular-nums">
            {formatCurrency(client.expectedAmount)}
          </span>
        </div>
      </div>

      {/* Contact info row */}
      <div className="px-3 pb-2 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Mail size={11} className="flex-shrink-0 text-[var(--color-text-dim)]" />
          <span className="truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Phone size={11} className="flex-shrink-0 text-[var(--color-text-dim)]" />
          <span>{client.phone}</span>
        </div>
      </div>

      {/* Expandable Activity Summary */}
      {(activities.length > 0) && (
        <div className="px-3 pb-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="
              flex items-center gap-1 text-xs text-[var(--color-text-dim)]
              hover:text-[var(--color-text-muted)] transition-colors
              cursor-pointer
            "
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {t('client.card.history', { count: activities.length })}
          </button>
          {expanded && (
            <div className="mt-1 space-y-1.5 bg-[var(--color-surface)] rounded-[var(--radius-sm)] px-2 py-1.5 animate-fade-in">
              {nextReminder && (
                <div className={`text-xs flex items-start gap-1.5 ${isOverdue ? 'text-red-500 font-semibold' : 'text-rose-500'}`}>
                  <Bell size={10} className="mt-0.5 shrink-0" />
                  <span className="line-clamp-2">{nextReminder.content}</span>
                </div>
              )}
              {activities
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .filter(a => a.id !== nextReminder?.id)
                .slice(0, 2)
                .map(act => (
                <div key={act.id} className="text-xs text-[var(--color-text-muted)] flex items-start gap-1.5">
                   <div className="w-1 h-1 mt-1.5 shrink-0 rounded-full bg-[var(--color-text-dim)]" />
                   <span className="line-clamp-1">{act.content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="
        flex items-center justify-between
        px-3 py-2 mt-1
        border-t border-[var(--color-border)]/50
      ">
        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-dim)]">
          <Calendar size={10} />
          <span>{formatRelativeDate(client.createdAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-[var(--transition-fast)]">
          {onMove && (
            <div className="relative" title={t('client.card.move')}>
              <button
                className="
                  p-1.5 rounded-[var(--radius-sm)] cursor-pointer
                  text-[var(--color-text-dim)] hover:text-[var(--color-accent)]
                  hover:bg-[var(--color-surface)] transition-all
                "
                aria-label={t('client.card.move')}
              >
                <ArrowRightLeft size={12} />
              </button>
              <select
                value={client.status}
                onChange={(e) => onMove(client.id, e.target.value as ClientStatus)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              >
                <option value="new">{t('kanban.columns.new')}</option>
                <option value="contacted">{t('kanban.columns.contacted')}</option>
                <option value="proposal">{t('kanban.columns.proposal')}</option>
                <option value="won">{t('kanban.columns.won')}</option>
                <option value="lost">{t('kanban.columns.lost')}</option>
              </select>
            </div>
          )}
          <button
            onClick={handleEdit}
            className="
              p-1.5 rounded-[var(--radius-sm)] cursor-pointer
              text-[var(--color-text-dim)] hover:text-[var(--color-accent)]
              hover:bg-[var(--color-surface)] transition-all
            "
            aria-label={t('client.card.edit')}
            title={t('client.card.edit')}
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={handleDelete}
            className={`
              p-1.5 rounded-[var(--radius-sm)] cursor-pointer transition-all
              ${
                confirmDelete
                  ? 'text-red-400 bg-red-500/20 hover:bg-red-500/30'
                  : 'text-[var(--color-text-dim)] hover:text-red-400 hover:bg-[var(--color-surface)]'
              }
            `}
            aria-label={confirmDelete ? t('client.card.delete') : t('client.card.delete')}
            title={confirmDelete ? t('client.card.delete') : t('client.card.delete')}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
