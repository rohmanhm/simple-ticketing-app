import { Outlet } from 'react-router-dom';

import { withProtectedAuth } from '@/features/auth';

export const RootLayout = withProtectedAuth(() => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center px-6 sm:max-w-3xl">
      <Outlet />
    </div>
  );
});
