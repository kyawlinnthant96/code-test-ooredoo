import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useAuthState } from '@/store/useAuthState.ts';
import { useToast } from '@/hooks/use-toast';

const loginValidationSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'enter a valid email address' }),
    password: z.string().min(1, { message: 'password is required' }),
});

const Login = () => {
    const { setAuthState } = useAuthState();
    const navigate = useNavigate();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof loginValidationSchema>>({
        resolver: zodResolver(loginValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof loginValidationSchema>) {
        if (
            values.email === 'admin@gmail.com' &&
            values.password === 'admin@123'
        ) {
            setAuthState(true);
            navigate('/admin/dashboard');
            toast({
                title: 'Login Successful',
            });
            return;
        }
        setAuthState(false);
        toast({
            variant: 'destructive',
            title: 'Invalid Credentials',
        });
    }

    return (
        <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
            <div className='h-auto min-w-[400px] rounded-lg bg-gray-100 px-4 py-8 shadow-lg'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex w-full flex-col gap-y-4'
                    >
                        <h1 className='text-center text-lg font-bold uppercase'>
                            Login
                        </h1>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter you email'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter you password'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login;
