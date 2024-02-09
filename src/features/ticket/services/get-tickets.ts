import { createQuery } from 'react-query-kit';

import { BaseResponse } from '@/types';

import { TicketType } from '../types';

interface Response extends BaseResponse<TicketType[]> {}
interface Variables {
  status?: string;
}
export const useTicketsQuery = createQuery<Response, Variables, Error>({
  queryKey: ['tickets'],
  fetcher: async ({ status }) =>
    fetch(`/api/tickets${status ? `?status=${status}` : ''}`, {
      method: 'GET',
    }).then((res) => res.json()),
});
