import { toast } from 'sonner';
import type { StateCreator } from 'zustand';

import { MAX_FAVORITES } from '../consts/favorite.const';
import type { Favorite } from '../types/favorite.type';
import type { FavoriteStore } from './favoriteStore.type';

export type FavoritesSlice = {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (name: string, region: string) => void;
  toggleFavorite: (favorite: Favorite) => void;
  updateAlias: (name: string, region: string, alias: string) => void;
};

const INITIAL_STATE: Pick<FavoritesSlice, 'favorites'> = {
  favorites: [],
};

export const createFavoritesSlice: StateCreator<
  FavoriteStore,
  [],
  [],
  FavoritesSlice
> = (set, get) => ({
  ...INITIAL_STATE,
  addFavorite: (favorite) => {
    const { favorites } = get();
    const isDuplicate = favorites.some(
      (f) => f.name === favorite.name && f.region === favorite.region,
    );
    if (isDuplicate || favorites.length >= MAX_FAVORITES) return;
    set({ favorites: [...favorites, favorite] });
  },
  removeFavorite: (name, region) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (f) => !(f.name === name && f.region === region),
      ),
    })),
  toggleFavorite: (favorite) =>
    set((state) => {
      const exists = state.favorites.some(
        (f) => f.name === favorite.name && f.region === favorite.region,
      );

      if (exists) {
        return {
          favorites: state.favorites.filter(
            (f) => !(f.name === favorite.name && f.region === favorite.region),
          ),
        };
      }

      if (state.favorites.length >= MAX_FAVORITES) {
        toast.error('즐겨찾기는 6개까지만 추가할 수 있어요');
        return state;
      }

      return { favorites: [...state.favorites, favorite] };
    }),
  updateAlias: (name, region, alias) =>
    set((state) => ({
      favorites: state.favorites.map((f) =>
        f.name === name && f.region === region
          ? { ...f, alias: alias.trim() || undefined }
          : f,
      ),
    })),
});
