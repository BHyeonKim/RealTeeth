import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { FavoriteStore } from './favoriteStore.type';
import { createFavoritesSlice } from './favoritesSlice';

export const useFavoriteStore = create<FavoriteStore>()(
	persist(
		(...a) => ({
			...createFavoritesSlice(...a),
		}),
		{
			name: 'favorites',
			partialize: (state) => ({ favorites: state.favorites }),
		},
	),
);
