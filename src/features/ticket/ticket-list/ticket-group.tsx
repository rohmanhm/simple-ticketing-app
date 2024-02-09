import { Loader2Icon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { useTicketsQuery } from '../services/get-tickets';
import { TicketType } from '../types';
import { TicketCard } from './ticket-card';

interface TicketGroupProps {
  status: TicketType['status'];
  title: string;
  description?: string;
}

export const TicketGroup = ({
  status,
  title,
  description,
}: TicketGroupProps) => {
  const {
    data: tickets,
    isSuccess,
    isLoading,
  } = useTicketsQuery({
    variables: { status },
  });
  const ticketsData = tickets?.data || [];
  return (
    <div className="border-2 dark:border-slate-900">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="w-full">
          <div className="bg-gray-300 p-4 text-left dark:bg-slate-800">
            <span className="text-lg">
              {title} {isSuccess && `(${ticketsData.length})`}
            </span>
            {!!description && (
              <p className="text-sm dark:text-slate-400">{description}</p>
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="dark:bg-slate-900">
          {isLoading && (
            <div className="p-4 text-center dark:text-slate-400">
              <Loader2Icon className="animate-spin" />
            </div>
          )}

          {ticketsData.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}

          {ticketsData.length === 0 && !isLoading && (
            <div className="p-4 text-center dark:text-slate-400">Empty.</div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
