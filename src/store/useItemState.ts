import { create } from 'zustand';
import { Item } from '@/types';
import { persist } from 'zustand/middleware';

interface ItemState {
    itemLists: Item[] | null;
    setItemLists: (items: Item[]) => void;
    createItem: (newItem: Item) => void;
    readItems: () => Item[] | null;
    updateItem: (updatedItem: Item) => void;
    deleteItem: (itemId: number) => void;
    getItemsByCategoryId: (categoryId: number) => Item[] | null;
}

const useItemState = create<ItemState>()(
    persist(
        (set, get) => ({
            itemLists: null,
            setItemLists: (items) => set({ itemLists: items }),
            createItem: (newItem) => {
                const { itemLists } = get();
                if (itemLists) {
                    set({ itemLists: [...itemLists, newItem] });
                } else {
                    set({ itemLists: [newItem] });
                }
            },
            readItems: () => get().itemLists,
            updateItem: (updatedItem) => {
                const { itemLists } = get();
                if (itemLists) {
                    const updatedList = itemLists.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    );
                    set({ itemLists: updatedList });
                }
            },
            deleteItem: (itemId) => {
                const { itemLists } = get();
                if (itemLists) {
                    const updatedList = itemLists.filter(
                        (item) => item.id !== itemId
                    );
                    set({ itemLists: updatedList });
                }
            },
            getItemsByCategoryId: (categoryId) => {
                const { itemLists } = get();
                if (itemLists) {
                    return itemLists.filter(
                        (item) => item.categoryId === categoryId
                    );
                }
                return null;
            },
        }),
        { name: 'item-state' } // Persist with 'item-state' as the key
    )
);

export default useItemState;
