/**
 * KanbanBoard — Mini CRM
 * Main drag-and-drop board using @dnd-kit.
 * Handles drag events and updates client status on drop.
 */

import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { Client, ClientStatus } from '../../types/client';
import { KANBAN_COLUMNS, ALL_STATUSES } from '../../constants/kanban';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface KanbanBoardProps {
  clientsByStatus: Map<ClientStatus, Client[]>;
  onAddClient: (status: ClientStatus) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
  onMoveClient: (id: string, newStatus: ClientStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  clientsByStatus,
  onAddClient,
  onEditClient,
  onDeleteClient,
  onMoveClient,
}) => {
  // Track the currently dragged client for overlay rendering
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  // Build a flat lookup: clientId → Client
  const allClientsMap = React.useMemo(() => {
    const map = new Map<string, Client>();
    clientsByStatus.forEach((clients) => {
      clients.forEach((c) => map.set(c.id, c));
    });
    return map;
  }, [clientsByStatus]);

  // ── Sensors ────────────────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Require 6px movement before activating drag (prevents accidental drags)
        distance: 6,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Given a draggable ID (client ID) or droppable ID (column status),
   * return the ClientStatus column it belongs to.
   */
  const findColumnForId = (id: string): ClientStatus | null => {
    // Check if ID is a column status directly
    if (ALL_STATUSES.includes(id as ClientStatus)) {
      return id as ClientStatus;
    }
    // Search in clients
    for (const [status, clients] of clientsByStatus) {
      if (clients.some((c) => c.id === id)) return status;
    }
    return null;
  };

  // ── Event handlers ─────────────────────────────────────────────────────────

  const handleDragStart = ({ active }: DragStartEvent) => {
    const client = allClientsMap.get(active.id as string);
    setActiveClient(client ?? null);
  };

  const handleDragOver = (_event: DragOverEvent) => {
    // Visual feedback is handled by isOver in KanbanColumn via useDroppable
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveClient(null);
    if (!over) return;

    const clientId = active.id as string;
    const targetId = over.id as string;

    // Determine destination column
    const destColumn = findColumnForId(targetId);
    if (!destColumn) return;

    const sourceColumn = findColumnForId(clientId);
    if (sourceColumn !== destColumn) {
      onMoveClient(clientId, destColumn);
    }
  };

  const handleDragCancel = () => {
    setActiveClient(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {/* Horizontal scrollable board */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 min-h-[60dvh]">
        {KANBAN_COLUMNS.map((config) => (
          <KanbanColumn
            key={config.id}
            config={config}
            clients={clientsByStatus.get(config.id) ?? []}
            onAddClient={onAddClient}
            onEditClient={onEditClient}
            onDeleteClient={onDeleteClient}
            onMoveClient={onMoveClient}
          />
        ))}
      </div>

      {/* Drag overlay — rendered on top of everything while dragging */}
      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}>
        {activeClient ? (
          <KanbanCard
            client={activeClient}
            onEdit={() => {}}
            onDelete={() => {}}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
