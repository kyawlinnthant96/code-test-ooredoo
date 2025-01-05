import { Outlet } from 'react-router';
import { useEffect } from 'react';
import useCategoryState from '@/store/useCategoryState.ts';
import { categories, itemLists } from '@/data/data';
import useItemState from '@/store/useItemState';
import { MenuHeader } from '@/components';

const AppLayout = () => {
    const { setCategoryLists, setSelectedCategoryId } = useCategoryState();
    const { setItemLists } = useItemState();

    useEffect(() => {
        if (!useCategoryState.getState().categoryLists) {
            setCategoryLists(categories);
        }
        setSelectedCategoryId(categories[0].id);
        if (!useItemState.getState().itemLists) {
            setItemLists(itemLists);
        }
    }, [setCategoryLists, setItemLists]);
    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden'>
            <div className='mx-auto flex h-full max-w-xl flex-col'>
                <MenuHeader />
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
