import { CalendarIcon } from 'lucide-react';

import type { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const { title, description, created_at: createdAt } = ticket;
  return (
    <div className="group flex flex-col p-4 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800">
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
  );
};
