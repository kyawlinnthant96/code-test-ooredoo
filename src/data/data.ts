import { Yogurt, Soda, Juice, BubbleTea, Coffee } from '@/assets/categories';
import { Banner1 } from '@/assets/banner';
import { DummyItem } from '@/assets/items';
import { Banner, Category, Item } from '@/types';

export const categories: Category[] = [
    {
        id: 1,
        title: 'Yogurt',
        imgUrl: Yogurt,
    },
    {
        id: 2,
        title: 'Soda',
        imgUrl: Soda,
    },
    {
        id: 3,
        title: 'Smoothie',
        imgUrl: Juice,
    },
    {
        id: 4,
        title: 'Coffee',
        imgUrl: Coffee,
    },
    {
        id: 5,
        title: 'Bubble Tea',
        imgUrl: BubbleTea,
    },
];

export const banner: Banner[] = [
    {
        id: 1,
        title: 'Popular Drinks',
        imgUrl: Banner1,
    },
    {
        id: 2,
        title: 'Popular Drinks',
        imgUrl: Banner1,
    },
    {
        id: 3,
        title: 'Popular Drinks',
        imgUrl: Banner1,
    },
];

export const itemLists: Item[] = [
    {
        id: 1,
        title: 'Strawberry Yogurt',
        price: 3000,
        description:
            'Natural fermented yogurt from pure fresh milk and passion fruit....',
        imgUrl: DummyItem,
        categoryId: 1,
    },
    {
        id: 2,
        title: 'Strawberry Yogurt',
        price: 3000,
        description:
            'Natural fermented yogurt from pure fresh milk and passion fruit....',
        imgUrl: DummyItem,
        categoryId: 2,
    },
    {
        id: 3,
        title: 'Strawberry Yogurt',
        price: 3000,
        description:
            'Natural fermented yogurt from pure fresh milk and passion fruit....',
        imgUrl: DummyItem,
        categoryId: 1,
    },
];
