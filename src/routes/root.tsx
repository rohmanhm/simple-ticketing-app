import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { Button } from '@/components/ui/button';

export const RootLayout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return (
    <div className="flex flex-col justify-center px-6">
      {auth.user ? (
        <div className="flex items-center justify-end pt-6">
          <strong>{auth.user.email}</strong>
          <Link to="/logout">
            <Button className="ml-4" variant="destructive" size="sm">
              Logout
            </Button>
          </Link>
        </div>
      ) : null}
      <Outlet />
    </div>
  );
};
