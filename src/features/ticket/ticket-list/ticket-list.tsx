import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useTicketsQuery, useUpdateTicketMutation } from '../services';
import { TicketType } from '../types';
import { checkAllowedToMoveStatus } from '../utils';

import { DroppableTicketGroup } from './droppable-ticket-group';
import { TicketCard } from './ticket-card';

export const TicketList = () => {
  const queryClient = useQueryClient();

  const [isDragging, setIsDragging] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketType | null>(null);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const updateTicketMutation = useUpdateTicketMutation({
    onMutate: (variables) => {
      // Removing from the previous status
      queryClient.setQueryData(
        useTicketsQuery.getKey({ status: activeTicket?.status }),
        (old) => ({
          ...old,
          data:
            old?.data.filter((ticket) => ticket.id !== activeTicket?.id) ?? [],
        })
      );
      // Adding to the targeted status
      queryClient.setQueryData(
        useTicketsQuery.getKey({ status: variables.status }),
        (old) => ({
          ...old,
          data:
            old?.data
              .concat(activeTicket as TicketType)
              .sort((a, b) => b.created_at - a.created_at) ?? [],
        })
      );
      setActiveTicket(null);
    },
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

    const { over, active } = event;

    const isNotMoving = active.data.current?.status === over?.id;
    const isAllowedToMove = checkAllowedToMoveStatus(
      active.data.current?.status,
      over?.id as string
    );

    if (isNotMoving || !isAllowedToMove) {
      return;
    }

    updateTicketMutation.mutate({
      id: active.id as string,
      status: over?.id as TicketType['status'],
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
