import { useCookies } from 'react-cookie';

export const useAuthCookies = () => {
  return useCookies(['user_session']);
};
