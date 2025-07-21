
import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (value: boolean) => void;
    setIsLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({

    isAuthenticated: false,
    user: null, 
    isLoading: true,
    setUser: (user) => set({ user }),
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setIsLoading: (value) => set({ isLoading : value }),

    fetchAuthenticatedUser: async () => {

        set({ isLoading: true });
        try {
            const user = await getCurrentUser(); // Assuming getCurrentUser is a function that fetches the current user
            
            if (user) {
                set({ isAuthenticated: true, user: user as User });
            }
            else {
                set({isAuthenticated: false, user: null});
            }   
        }
        catch (error) {
            console.error('Error fetching authenticated user:', error);
            set({ isAuthenticated: false, user: null });
        }
        finally {
            set({ isLoading: false });
        }
    }

}))

export default useAuthStore;