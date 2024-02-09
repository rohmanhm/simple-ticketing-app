import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';

export function withProtectedAuth<Props extends object>(
  Component: ComponentType<Props>
) {
  const WrappedComponent = (props: Props) => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
      if (!auth.user) {
        navigate('/login', { replace: true });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.user]);

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withProtectedAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
