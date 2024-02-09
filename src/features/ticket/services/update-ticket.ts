import { createMutation } from 'react-query-kit';

import { BaseResponse } from '@/types';

import { Ticket } from '../types';

interface Response extends BaseResponse<Ticket> {}
type Variables = Partial<Ticket>;

export const useUpdateTicketMutation = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: async (variables) =>
    fetch('/api/tickets', {
      method: 'PUT',
      body: JSON.stringify(variables),
    }).then((res) => res.json()),
});
