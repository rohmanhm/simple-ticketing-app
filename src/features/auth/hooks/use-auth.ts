import { useAuthCookies } from './use-auth-cookies';

interface User {
  email: string;
}

export const useAuth = () => {
  const [cookies, setCookies, removeCookies] = useAuthCookies();

  const saveUser = (user: User) => {
    setCookies('user_session', user);
  };

  const logout = () => removeCookies('user_session');

  return { user: cookies.user_session as User, saveUser, logout };
};
