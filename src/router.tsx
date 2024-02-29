import { createBrowserRouter } from 'react-router-dom';

import {
  ErrorPage,
  LoginPage,
  LogoutPage,
  MainPage,
  RegisterPage,
  RootLayout,
  TicketDetailPage,
} from './routes';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
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
