import { Outlet, useNavigate } from 'react-router';
import { useAuthState } from '@/store/useAuthState.ts';
import { useEffect } from 'react';
import useCategoryState from '@/store/useCategoryState.ts';
import useItemState from '@/store/useItemState.ts';
import { categories, itemLists } from '@/data/data';
import { AppSidebar } from '@/components';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';

const DashboardLayout = () => {
    const { authState } = useAuthState();
    const navigate = useNavigate();
    const { setCategoryLists } = useCategoryState();
    const { setItemLists } = useItemState();

    useEffect(() => {
        if (!authState) {
            navigate('/admin');
            return;
        }

        if (!useCategoryState.getState().categoryLists) {
            setCategoryLists(categories);
        }

        if (!useItemState.getState().itemLists) {
            setItemLists(itemLists);
        }
    }, [authState, navigate, setCategoryLists, setItemLists]);

    return (
        <SidebarProvider className='flex h-[100vh] w-[100vw] items-start justify-start overflow-hidden'>
            <AppSidebar />
            <div className='h-full w-full flex-1 overflow-y-auto overflow-x-hidden p-4'>
                <Outlet />
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;
