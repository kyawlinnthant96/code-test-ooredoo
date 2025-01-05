import useOrderState from '@/store/useOrderState.ts';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils.ts';

const OrderConfirm = () => {
    const { orderInfo } = useOrderState();
    const [otp, setOtp] = useState<string>('');
    const [remainingTime, setRemainingTime] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [notValidOtp, setNotValidOtp] = useState(false);
    const navigate = useNavigate();
    const validOtp = '007007';
    const handleOtpInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOtp(value);
    };

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => {
                    const updatedTime = prev - 1;
                    if (updatedTime === 0) {
                        setCanResend(true);
                    }
                    return Math.max(0, updatedTime);
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    const resendOtp = () => {
        if (canResend) {
            setRemainingTime(30);
            setCanResend(false);
        }
    };

    const submitOrder = () => {
        if (otp && otp.length === 6) {
            if (otp === validOtp) {
                navigate('/order-success');
            }
            setNotValidOtp(true);
        }
    };

    const handleTryAgain = () => {
        setNotValidOtp(false);
        setOtp('');
    };

    return (
        <div className='relative flex h-full w-full flex-col px-4 py-6'>
            <div className='flex gap-2'>
                <div className='flex flex-1 flex-col gap-2'>
                    <Label className='text-md font-bold uppercase leading-4'>
                        Current Phone Number
                    </Label>
                    <p className='text-[14px] font-normal'>{orderInfo}</p>
                </div>
                <span className='h-auto cursor-pointer p-0 text-md font-bold uppercase leading-4 text-primary'>
                    Change
                </span>
            </div>
            <div className='mt-6 flex flex-col gap-2'>
                <Label className='text-md font-bold uppercase leading-4'>
                    Please Enter Otp
                </Label>
                <div className='relative'>
                    <Input
                        className={cn(
                            'relative mt-2 h-14 rounded-none text-[18px] leading-7 focus:outline-none focus:ring-0',
                            notValidOtp
                                ? 'text-primary outline outline-red-500'
                                : 'text-black'
                        )}
                        value={otp}
                        maxLength={6}
                        onChange={handleOtpInputChange}
                        placeholder='_ _ _ _ _ _'
                    />
                    <div className='absolute right-2 top-1/2 mt-1 -translate-x-1/2 -translate-y-1/2 text-[18px]'>
                        {remainingTime}s
                    </div>
                </div>
                {notValidOtp ? (
                    <p className='text-[14px] font-normal'>
                        Wrong Otp.{' '}
                        <span
                            onClick={handleTryAgain}
                            className='cursor-pointer text-blue-500 underline'
                        >
                            Try again
                        </span>
                    </p>
                ) : (
                    <p className='text-[14px] font-normal'>
                        Didn't receive?{' '}
                        <span
                            onClick={resendOtp}
                            className={`${
                                canResend
                                    ? 'cursor-pointer text-blue-500'
                                    : 'cursor-not-allowed text-gray-400'
                            }`}
                        >
                            Resend
                        </span>
                    </p>
                )}
            </div>
            <div className='absolute inset-x-0 bottom-0 flex items-center justify-center py-10'>
                <Button
                    disabled={otp.length !== 6}
                    onClick={submitOrder}
                    className={cn(
                        'rounded-full uppercase',
                        otp.length !== 6 && 'bg-gray-300'
                    )}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default OrderConfirm;
