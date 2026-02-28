import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      favorites: [],
      isAuthenticated: false,

      login: (user, token) => {
        localStorage.setItem('tregtia_token', token);
        set({ user, token, isAuthenticated: true, favorites: [] });
      },

      logout: () => {
        localStorage.removeItem('tregtia_token');
        set({ user: null, token: null, isAuthenticated: false, favorites: [] });
      },

      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),

      toggleFavorite: (listingId) => {
        const { favorites } = get();
        const isFav = favorites.includes(listingId);
        set({ favorites: isFav ? favorites.filter((id) => id !== listingId) : [...favorites, listingId] });
      },

      isFavorite: (listingId) => get().favorites.includes(listingId),
    }),
    {
      name: 'tregtia_auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        favorites: state.favorites,
      }),
    }
  )
);

export default useAuthStore;
