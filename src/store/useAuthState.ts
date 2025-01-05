import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useAuthStateProps {
    authState: boolean | null;
    setAuthState: (state: boolean) => void;
}

export const useAuthState = create<useAuthStateProps>()(
    persist(
        (set) => ({
            authState: null,
            setAuthState: (state) => set({ authState: state }),
        }),
        {
            name: 'auth-state',
        }
    )
);
