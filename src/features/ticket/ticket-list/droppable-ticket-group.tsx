import { useDroppable } from '@dnd-kit/core';

import { checkAllowedToMoveStatus } from '../utils';
import { TicketGroup, TicketGroupProps } from './ticket-group';

export const DroppableTicketGroup = (props: TicketGroupProps) => {
  const { isOver, setNodeRef, active, over } = useDroppable({
    id: props.status,
  });

  const isNotMoving = active?.data.current?.status === over?.id;
  const isAllowedToMove = checkAllowedToMoveStatus(
    active?.data.current?.status,
    over?.id as string
  );

  const style = {
    color: isOver && !isNotMoving ? 'blue' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TicketGroup {...props} />
      {isOver && active ? (
        <>{!isNotMoving && !isAllowedToMove && 'Cannot move to this status.'}</>
      ) : null}
    </div>
  );
};
