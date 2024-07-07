import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import AccommoDetailPage from '../pages/AccommoDetailPage';
import RoomDetailPage from '../pages/RoomDetailPage';
import Payment from '../pages/Payment';
import Layout from '../components/Layout';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'accommodations/:id',
        element: <AccommoDetailPage />,
      },
      {
        path: 'accommodations/:accommodationId/:productId',
        element: <RoomDetailPage />,
      },
      {
        path: '/payment-page/:accommodationId/:productId',
        element: <ProtectedRoute component={Payment} />,
      },
    ],
  },
]);
