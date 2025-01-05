import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import useItemState from '@/store/useItemState';
import useCategoryState from '@/store/useCategoryState';
import useOrderState from '@/store/useOrderState';
import { useNavigate } from 'react-router';

const ItemLists = () => {
    const { getItemsByCategoryId } = useItemState();
    const { selectedCategoryId } = useCategoryState();
    const { setOrderInfo } = useOrderState();
    const navigate = useNavigate();
    const itemLists = getItemsByCategoryId(selectedCategoryId as number);
    const phoneRegex = new RegExp(/^09[0-9]{5,9}$/g);
    const formSchema = z.object({
        phoneNumber: z
            .string()
            .min(5, { message: 'Phone number must be at least 5 digits' })
            .max(11, 'Phone number cannot exceed 11 digits')
            .regex(phoneRegex, {
                message: 'Phone number is not valid',
            }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: '',
        },
        mode: 'onChange',
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setOrderInfo(values.phoneNumber);
        navigate('/order');
    }
    return (
        <Dialog>
            <div className='flex flex-1 flex-col p-3'>
                {itemLists?.map((item, index) => (
                    <>
                        <div
                            key={item.id}
                            className='flex flex-col gap-2.5 p-2'
                        >
                            <div className='flex gap-2'>
                                <div className='flex flex-1 flex-col items-start justify-between gap-2'>
                                    <div className='flex w-full flex-col'>
                                        <h3 className='text-[14px] font-normal leading-5'>
                                            {item.title}
                                        </h3>
                                        <p className='text-[14px] font-normal leading-5'>
                                            {item.price.toLocaleString()} MMK
                                        </p>
                                    </div>
                                    <p className='line-clamp-2 text-md font-normal leading-4'>
                                        {item.description}
                                    </p>
                                </div>
                                <img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    className='h-24 w-20 rounded-md bg-slate-200'
                                />
                            </div>
                            <DialogTrigger>
                                <div className='flex items-center justify-end'>
                                    <Button>Order Now</Button>
                                </div>
                            </DialogTrigger>
                        </div>
                        {index < itemLists.length - 1 && (
                            <Separator className='my-2' />
                        )}
                    </>
                ))}
            </div>
            <DialogContent className='w-[300px] rounded-xl'>
                <DialogHeader>Phone Number</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='phoneNumber'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className='relative min-h-14 w-full'>
                                            <Input
                                                className='h-14 w-full py-0 pl-14 text-[18px]'
                                                placeholder='Phone'
                                                {...field}
                                            />
                                            <div className='absolute left-6 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2'>
                                                <Phone className='font-bold text-gray-300' />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='mt-8 flex items-center justify-center'>
                            <Button
                                disabled={!form.formState.isValid}
                                type={'submit'}
                                className={cn(
                                    'capitalize',
                                    !form.formState.isValid
                                        ? 'bg-gray-300'
                                        : 'bg-primary'
                                )}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ItemLists;
