import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { TicketCard } from '.';
import { useTicketsQuery, useUpdateTicketMutation } from '../services';
import { TicketType } from '../types';
import { checkAllowedToMoveStatus } from '../utils';
import { DroppableTicketGroup } from './droppable-ticket-group';

export const TicketList = () => {
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketType | null>(null);

  const updateTicketMutation = useUpdateTicketMutation({
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: useTicketsQuery.getKey() });
    },
  });

  function handleDragStart(event: DragStartEvent) {
    setActiveTicket(event.active.data.current as TicketType);
    setIsDragging(true);
  }

  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
    setActiveTicket(null);

    const { over, active } = event;

    const isNotMoving = active.data.current?.status === over?.id;
    const isAllowedToMove = checkAllowedToMoveStatus(
      active.data.current?.status,
      over?.id as string
    );

    // prevent moving to it's own.
    if (isNotMoving || !isAllowedToMove) {
      return;
    }

    updateTicketMutation.mutate({
      id: active.id as string,
      status: over?.id as TicketType['status'],
    });
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col overflow-hidden rounded-xl border-4 dark:border-slate-900">
        <DroppableTicketGroup status="open" title="Open" />
        <DroppableTicketGroup status="in-progress" title="In Progress" />
        <DroppableTicketGroup status="completed" title="Completed" />
      </div>

      <DragOverlay>
        {isDragging ? (
          <TicketCard ticket={activeTicket as TicketType} isDragging={true} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
