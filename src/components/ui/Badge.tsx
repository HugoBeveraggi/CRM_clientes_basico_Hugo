/**
 * Badge — Mini CRM UI
 * Renders a colored status badge for a given ClientStatus.
 */

import React from 'react';
import type { ClientStatus } from '../../types/client';
import { KANBAN_COLUMN_MAP } from '../../constants/kanban';

interface BadgeProps {
  status: ClientStatus;
  className?: string;
}

const STATUS_CSS_CLASS: Record<ClientStatus, string> = {
  new: 'status-new',
  contacted: 'status-contacted',
  proposal: 'status-proposal',
  won: 'status-won',
  lost: 'status-lost',
};

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const col = KANBAN_COLUMN_MAP.get(status);
  const cssClass = STATUS_CSS_CLASS[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        border ${cssClass} ${className}
      `}
    >
      <span>{col?.icon}</span>
      <span>{col?.title ?? status}</span>
    </span>
  );
};
