import { createMutation } from 'react-query-kit';

import { BaseResponse } from '@/types';

import { TicketType } from '../types';

interface Response extends BaseResponse<TicketType> {}
type Variables = Partial<TicketType>;

export const useCreateTicketMutation = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: async (variables) =>
    fetch('/api/tickets', {
      method: 'POST',
      body: JSON.stringify(variables),
    }).then((res) => res.json()),
});
