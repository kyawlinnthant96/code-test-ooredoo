import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CirclePlus } from 'lucide-react';
import useCategoryState from '@/store/useCategoryState';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import useItemState from '@/store/useItemState';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Item title is required' }),
    price: z.string().min(1, { message: 'Price is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    imgUrl: z.instanceof(File).nullable(),
    categoryId: z.string().min(1, { message: 'Category id is required' }),
});

const Items = () => {
    const { readCategories } = useCategoryState();
    const { createItem, readItems, deleteItem } = useItemState();
    const items = readItems();
    const categories = readCategories();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            price: '0',
            description: '',
            categoryId: '',
            imgUrl: null,
        },
    });

    const handleFileChange = (file: File | null) => {
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const newItem = {
            id: items?.length ? items.length + 1 : 1,
            title: values.title,
            price: Number(values.price),
            description: values.description,
            categoryId: Number(values.categoryId),
            imgUrl: imagePreview as string,
        };

        createItem(newItem);
        form.reset();
        setImagePreview(null);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        deleteItem(id);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className='flex h-full w-full flex-col'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-semibold'>Items</h1>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <CirclePlus /> Add New Item
                        </Button>
                    </DialogTrigger>
                </div>
                <div className='mt-4 flex flex-1'>
                    <Table>
                        <TableCaption>A list of recent Items.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[100px]'>Id</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category Type</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className='font-medium'>
                                        {item.id}
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.categoryId}</TableCell>
                                    <TableCell className='text-right'>
                                        <img
                                            src={item.imgUrl}
                                            alt={item.title}
                                            className='h-6 w-6 object-contain'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='destructive'
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DialogContent className='w-md rounded-xl'>
                <DialogHeader>Create Item</DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-3'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Item Title'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            placeholder='Price'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Description'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='categoryId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select Category' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.map((category) => (
                                                <SelectItem
                                                    value={String(category.id)}
                                                >
                                                    {category.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='imgUrl'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] || null;
                                                field.onChange(file);
                                                handleFileChange(file);
                                            }}
                                        />
                                    </FormControl>
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt='Preview'
                                            className='mt-2 h-20 w-20 object-contain'
                                        />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default Items;
