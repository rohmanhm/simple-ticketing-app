import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { TicketDetail, TicketType, useTicketQuery } from '@/features/ticket';

export const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: ticketData,
    isLoading,
    isSuccess,
  } = useTicketQuery({
    variables: { id: id as string },
  });

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center p-6">
          <Loader2Icon className="h-10 w-10 animate-spin" />
        </div>
      )}
      {isSuccess && (
        <TicketDetail defaultValues={ticketData?.data as TicketType} />
      )}
    </div>
  );
};
