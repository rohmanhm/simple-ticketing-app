import { useDraggable } from '@dnd-kit/core';

import { TicketCard, TicketCardProps } from './ticket-card';

export const DraggableTicketCard = ({ ticket }: TicketCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ticket.id,
      data: ticket,
    });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TicketCard
        isDragging={isDragging}
        ticket={ticket}
        dragAreaProps={listeners}
      />
    </div>
  );
};
