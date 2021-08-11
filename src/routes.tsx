import { AppLayout } from 'components/AppLayout';
import { MainLayout } from 'components/MainLayout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Navigate } from 'react-router-dom';
import { UsersMetricsPage } from 'pages/UsersMetricsPage';

const routes = [
  {
    path: 'app',
    element: <AppLayout />,
    children: [
      { path: 'user-metrics', element: <UsersMetricsPage /> },
      { path: '/', element: <Navigate to="/404" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundPage /> },
      { path: '/', element: <Navigate to="/app/user-metrics" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
