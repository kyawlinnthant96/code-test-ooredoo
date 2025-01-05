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
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Category title is required' }),
    imgUrl: z.instanceof(File).nullable(),
});

const Categories = () => {
    const { readCategories, createCategory, deleteCategory } =
        useCategoryState();
    const categories = readCategories();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
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
        const newCategory = {
            id: categories?.length ? categories.length + 1 : 1,
            title: values.title,
            imgUrl: imagePreview as string,
        };

        createCategory(newCategory);
        form.reset();
        setImagePreview(null);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        deleteCategory(id);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className='flex h-full w-full flex-col'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-semibold'>Categories</h1>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <CirclePlus /> Add Category
                        </Button>
                    </DialogTrigger>
                </div>
                <div className='mt-4 flex flex-1'>
                    <Table>
                        <TableCaption>
                            A list of recent categories.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[100px]'>Id</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories?.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className='font-medium'>
                                        {category.id}
                                    </TableCell>
                                    <TableCell>{category.title}</TableCell>
                                    <TableCell className='text-right'>
                                        <img
                                            src={category.imgUrl}
                                            alt={category.title}
                                            className='h-6 w-6 object-contain'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='destructive'
                                            onClick={() =>
                                                handleDelete(category.id)
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
                <DialogHeader>Create Category</DialogHeader>
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
                                            placeholder='Category Title'
                                            {...field}
                                        />
                                    </FormControl>
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

export default Categories;
