import { createQuery } from 'react-query-kit';

import { BaseResponse } from '@/types';

import { TicketType } from '../types';

interface Response extends BaseResponse<TicketType> {}
interface Variables {
  id: string;
}
export const useTicketQuery = createQuery<Response, Variables, Error>({
  queryKey: ['tickets'],
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  fetcher: async ({ id }) =>
    fetch(`/api/ticket/${id}`, {
      method: 'GET',
    }).then((res) => res.json()),
});
