import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { CardContent } from '@/components/ui/card';
import { banner } from '@/data/data';
import Autoplay from 'embla-carousel-autoplay';

const Banner = () => {
    return (
        <div className='flex h-auto w-full flex-col gap-1 px-3'>
            <h2 className='text-center text-lg font-semibold text-black'>
                Welcome to Cheese O’Tea.
            </h2>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                className='mx-auto w-full min-w-[350px]'
            >
                <CarouselContent>
                    {banner.map((item) => (
                        <CarouselItem key={item.id}>
                            <CardContent className='m-0 min-h-[160px] w-full p-0'>
                                <img src={item.imgUrl} alt={item.title} />
                            </CardContent>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Banner;
