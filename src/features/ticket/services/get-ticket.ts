import { createQuery } from 'react-query-kit';

import { BaseResponse } from '@/types';

import { Ticket } from '../types';

interface Response extends BaseResponse<Ticket[]> {}
interface Variables {
  id: string;
}
export const useTicketQuery = createQuery<Response, Variables, Error>({
  queryKey: ['tickets'],
  fetcher: async ({ id }) =>
    fetch(`/api/tickets/${id}`, {
      method: 'GET',
    }).then((res) => res.json()),
});
