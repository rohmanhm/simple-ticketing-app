import { CaretLeftIcon } from '@radix-ui/react-icons';
import { ComponentType } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { Button } from '@/components/ui/button';

interface WithNavbarOptions {
  backTo: number | To;
}

export function withNavbar<Props extends object>(
  Component: ComponentType<Props>,
  options?: WithNavbarOptions
) {
  const { backTo } = options ?? { backTo: null };

  const WrappedComponent = (props: Props) => {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
      <>
        <div className="flex items-center justify-between">
          {backTo ? (
            <Button
              variant="link"
              className="px-0"
              onClick={() => navigate(backTo as number)}
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
        <Component {...props} />
      </>
    );
  };

  WrappedComponent.displayName = `withNavbar(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
