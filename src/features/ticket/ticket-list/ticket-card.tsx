import { CalendarIcon, EditIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';

import { EditTicketDialog } from '..';
import type { TicketType } from '../types';

interface TicketCardProps {
  ticket: TicketType;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const { id, title, description, created_at: createdAt } = ticket;
  const editDialog = useDisclosure();

  return (
    <>
      <Link to={`/ticket/${id}`} state={{ from: '/' }}>
        <div className="group flex flex-row items-center justify-between p-4 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800">
          <div className="flex flex-col">
            <div className="flex items-center dark:text-slate-600">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="text-xs">
                {new Intl.DateTimeFormat('en-US').format(new Date(createdAt))}
              </span>
            </div>
            <span className="text-lg">{title}</span>
            {!!description && (
              <p className="text-sm dark:text-slate-500">{description}</p>
            )}
          </div>
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
        </div>
      </Link>

      {editDialog.isOpen && (
        <EditTicketDialog {...editDialog} defaultValues={ticket} />
      )}
    </>
  );
};
