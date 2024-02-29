import { Loader2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { TicketDetail, useTicketQuery } from '@/features/ticket';

import { withNavbar } from '@/hocs/with-navbar';

export const TicketDetailPage = withNavbar(
  () => {
    const { ticketId = '' } = useParams<{ ticketId: string }>();
    const {
      data: ticketData,
      isLoading,
      isSuccess,
    } = useTicketQuery({
      variables: { ticketId },
    });

    return (
      <div className="w-full">
        {isLoading && (
          <div className="flex items-center justify-center p-6">
            <Loader2Icon className="h-10 w-10 animate-spin" />
          </div>
        )}
        {isSuccess && <TicketDetail defaultValues={ticketData?.data} />}
      </div>
    );
  },
  { backTo: '/' }
);
