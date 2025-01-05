import OrderSuccessPng from '@/assets/order-success.png';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router';

const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className='mt-60 flex h-full w-full items-start justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <img
                    src={OrderSuccessPng}
                    alt='Order success logo'
                    className='h-20 w-20 object-cover'
                />
                <div className='flex flex-col text-center text-[14px] font-normal leading-5'>
                    <p className=''>Your order is received.</p>
                    <p className=''>We will contact you shortly.</p>
                </div>

                <Button
                    variant='outline'
                    className='mt-8 h-10 w-32 rounded-full border-primary text-[12px] font-semibold uppercase text-primary'
                    onClick={() => navigate('/')}
                >
                    Back To Home
                </Button>
            </div>
        </div>
    );
};

export default OrderSuccess;
