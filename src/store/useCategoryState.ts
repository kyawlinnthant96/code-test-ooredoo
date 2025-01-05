import { create } from 'zustand';
import { Category } from '@/types';
import { persist } from 'zustand/middleware';

interface CategoryState {
    categoryLists: Category[] | null;
    setCategoryLists: (categories: Category[]) => void;
    createCategory: (newCategory: Category) => void;
    readCategories: () => Category[] | null;
    updateCategory: (updatedCategory: Category) => void;
    deleteCategory: (categoryId: number) => void;
    selectedCategoryId: number | null;
    setSelectedCategoryId: (selectedCategoryId: number) => void;
}

const useCategoryState = create<CategoryState>()(
    persist(
        (set, get) => ({
            categoryLists: null,
            setCategoryLists: (categories) =>
                set({ categoryLists: categories }),
            createCategory: (newCategory) => {
                const { categoryLists } = get();
                if (categoryLists) {
                    set({ categoryLists: [...categoryLists, newCategory] });
                } else {
                    set({ categoryLists: [newCategory] });
                }
            },
            readCategories: () => get().categoryLists,
            updateCategory: (updatedCategory) => {
                const { categoryLists } = get();
                if (categoryLists) {
                    const updatedList = categoryLists.map((category) =>
                        category.id === updatedCategory.id
                            ? updatedCategory
                            : category
                    );
                    set({ categoryLists: updatedList });
                }
            },
            deleteCategory: (categoryId: number) => {
                const { categoryLists } = get();
                if (categoryLists) {
                    const updatedList = categoryLists.filter(
                        (category) => category.id !== categoryId
                    );
                    set({ categoryLists: updatedList });
                }
            },
            selectedCategoryId: null,
            setSelectedCategoryId: (categoryId: number) => {
                set({ selectedCategoryId: categoryId });
            },
        }),
        { name: 'category-state' }
    )
);

export default useCategoryState;
