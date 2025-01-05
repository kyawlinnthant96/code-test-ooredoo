import { Banner, Category, ItemLists } from '@/components';

const Menu = () => {
    return (
        <div className='flex h-full w-full flex-col gap-y-2 py-2'>
            <Banner />
            <Category />
            <ItemLists />
        </div>
    );
};

export default Menu;
