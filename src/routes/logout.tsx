import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex">
      Logging you out. Redirecting to login page ...
    </div>
  );
};
