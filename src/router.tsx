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
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
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
        path: 'ticket/:ticketId',
        element: <TicketDetailPage />,
      },
    ],
  },
]);
