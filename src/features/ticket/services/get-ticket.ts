import { createQuery } from 'react-query-kit';

import { BaseResponse } from '@/types';

import { TicketType } from '../types';

interface Response extends BaseResponse<TicketType> {}
interface Variables {
  ticketId: string;
}
export const useTicketQuery = createQuery<Response, Variables, Error>({
  queryKey: ['tickets'],
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  fetcher: async ({ ticketId }) =>
    fetch(`/api/ticket/${ticketId}`, {
      method: 'GET',
    }).then((res) => res.json()),
});
