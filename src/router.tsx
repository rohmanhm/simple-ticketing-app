import { createBrowserRouter } from 'react-router-dom';

import {
  ErrorPage,
  LoginPage,
  LogoutPage,
  MainPage,
  RootLayout,
  TicketDetailPage,
} from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'ticket/:id',
        element: <TicketDetailPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
]);
