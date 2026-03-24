import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null, 
            users: [],  
            isAuthenticated: false,

            registerUser: (newUser) => {
                const { users } = get();
                if (users.find(u => u.email === newUser.email)) {
                    throw new Error("User already exists");
                }
                set({ users: [...users, newUser] });
            },

            login: (email, password) => {
                const { users } = get();
                const foundUser = users.find(u => u.email === email && u.password === password);

                if (foundUser) {
                    set({ user: foundUser, isAuthenticated: true });
                    return true;
                }
                return false;
            },

            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        { name: 'auth-storage' }
    )
);

