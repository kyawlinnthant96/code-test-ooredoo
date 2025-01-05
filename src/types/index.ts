export type Category = {
    id: number;
    title: string;
    imgUrl: string;
};

export type Banner = {
    id: number;
    title: string;
    imgUrl: string;
};

export type Item = {
    id: number;
    title: string;
    price: number;
    description: string;
    imgUrl: string;
    categoryId: number;
};
