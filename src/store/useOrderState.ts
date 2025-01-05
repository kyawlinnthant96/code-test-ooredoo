import { create } from 'zustand';

interface OrderState {
    orderInfo: string | null;
    setOrderInfo: (phone: string) => void;
}

const useOrderState = create<OrderState>((set) => ({
    orderInfo: null,
    setOrderInfo: (phone) => set({ orderInfo: phone }),
}));

export default useOrderState;
