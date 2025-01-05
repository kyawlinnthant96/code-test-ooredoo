import { createBrowserRouter } from 'react-router';
import AppLayout from './layouts/AppLayout';
import DashboardLayout from './layouts/DashboardLayout';
import {
    OrderConfirm,
    Menu,
    OrderSuccess,
    Login,
    Categories,
    Items,
} from '@/pages';

type Router = ReturnType<typeof createBrowserRouter>;

export const router: Router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Menu />,
            },
            {
                path: 'order',
                element: <OrderConfirm />,
            },
            {
                path: 'order-success',
                element: <OrderSuccess />,
            },
        ],
    },
    {
        path: '/admin',
        element: <Login />,
    },
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Categories />,
            },
            {
                path: 'items',
                element: <Items />,
            },
        ],
    },
]);
