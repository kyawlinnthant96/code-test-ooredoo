import BackButton from '@/components/BackButton.tsx';

const MenuHeader = () => {
    return (
        <div className='relative flex min-h-[60px] w-full items-center justify-center bg-primary'>
            <div className='absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <BackButton />
            </div>
            <h3 className='text-lg font-semibold text-white'>Menu</h3>
        </div>
    );
};

export default MenuHeader;
