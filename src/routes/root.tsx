import { CaretLeftIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { Button } from '@/components/ui/button';

export const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const back = location.state?.from;

  useEffect(() => {
    if (!auth.user) {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return (
    <div className="mx-auto flex w-full flex-col justify-center px-6 sm:max-w-3xl">
      <div className="flex items-center justify-between">
        {back ? (
          <Button
            variant="link"
            className="px-0"
            onClick={() => navigate(back, { state: { from: undefined } })}
          >
            <CaretLeftIcon className="mr-2 h-6 w-6" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {auth.user ? (
          <div className="flex items-center justify-end py-6">
            <strong>{auth.user.email}</strong>
            <Link to="/logout">
              <Button className="ml-4" variant="destructive" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
      <Outlet />
    </div>
  );
};
