import { createMutation } from 'react-query-kit';

import { BaseResponse } from '@/types';

interface Response extends BaseResponse<{ email: string }> {}
interface Variables {
  email: string;
  password: string;
}
export const useRegisterMutation = createMutation<Response, Variables, Error>({
  mutationFn: async (variables) =>
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(variables),
    }).then((res) => res.json()),
});
