import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { FavoriteStore } from './favoriteStore.type';
import { createFavoritesSlice } from './favoritesSlice';
import { createSidebarSlice } from './sidebarSlice';

export const useFavoriteStore = create<FavoriteStore>()(
	persist(
		(...a) => ({
			...createFavoritesSlice(...a),
			...createSidebarSlice(...a),
		}),
		{
			name: 'favorites',
			partialize: (state) => ({ favorites: state.favorites }),
		},
	),
);
