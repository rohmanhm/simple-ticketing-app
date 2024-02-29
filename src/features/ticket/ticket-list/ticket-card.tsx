import { CalendarIcon, EditIcon, GripVerticalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/utils';

import { EditTicketDialog } from '../manage-ticket';
import type { TicketType } from '../types';

export interface TicketCardProps {
  ticket: TicketType;
  isDragging?: boolean;
  dragAreaProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export const TicketCard = ({
  ticket,
  dragAreaProps,
  isDragging,
}: TicketCardProps) => {
  const { id, title, description, created_at: createdAt } = ticket;
  const editDialog = useDisclosure();

  return (
    <>
      <div
        className={cn(
          'group flex cursor-default flex-row items-center pr-4 hover:bg-gray-200 dark:hover:bg-slate-800',
          { 'w-96': isDragging, 'bg-gray-200 dark:bg-slate-800': isDragging }
        )}
      >
        <button
          className="flex items-center self-stretch bg-slate-800 px-2 hover:cursor-grab hover:bg-slate-950"
          {...dragAreaProps}
        >
          <GripVerticalIcon className="h-4 w-4 text-slate-500 hover:text-slate-100" />
        </button>

        <div className="flex flex-1 flex-col p-4 pr-0">
          <div className="flex items-center dark:text-slate-600">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-xs">
              {new Intl.DateTimeFormat('en-US').format(new Date(createdAt))}
            </span>
          </div>
          <span className="cursor-pointer text-lg hover:underline">
            <Link to={`/ticket/${id}`} state={{ from: '/' }}>
              {title}
            </Link>
          </span>
          {!!description && (
            <p className="text-sm dark:text-slate-500">{description}</p>
          )}
        </div>

        {!isDragging && (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              editDialog.onOpen();
            }}
          >
            <EditIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      {editDialog.isOpen && (
        <EditTicketDialog {...editDialog} defaultValues={ticket} />
      )}
    </>
  );
};
