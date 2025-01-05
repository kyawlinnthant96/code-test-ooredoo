import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel.tsx';

import useCategoryState from '@/store/useCategoryState.ts';
import { cn } from '@/lib/utils.ts';

const Category = () => {
    const { readCategories, selectedCategoryId, setSelectedCategoryId } =
        useCategoryState();
    const categories = readCategories();
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className='w-full px-3'
        >
            <CarouselContent className='gap-2 pl-5'>
                {categories?.map((item) => (
                    <CarouselItem
                        key={item.id}
                        className={cn(
                            'flex min-h-[60px] basis-1/6 flex-col items-center justify-start gap-2 rounded-lg border p-1',
                            selectedCategoryId === item.id
                                ? 'border-primary shadow-custom-shadow-selected'
                                : 'border-gray-300 shadow-custom-shadow-normal'
                        )}
                        onClick={() => setSelectedCategoryId(item.id)}
                    >
                        <img
                            src={item.imgUrl}
                            alt={item.title}
                            className='h-6 w-7 object-contain'
                        />
                        <p
                            className={cn(
                                'text-[10px] leading-3',
                                selectedCategoryId === item.id
                                    ? 'font-semibold text-primary'
                                    : 'font-normal text-gray-300'
                            )}
                        >
                            {item.title}
                        </p>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default Category;
/* SubCategory */
