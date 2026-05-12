import type { StateCreator } from 'zustand';

import type { FavoriteStore } from './favoriteStore.type';

export type SidebarSlice = {
	isOpen: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
};

const INITIAL_STATE: Pick<SidebarSlice, 'isOpen'> = {
	isOpen: false,
};

export const createSidebarSlice: StateCreator<FavoriteStore, [], [], SidebarSlice> = (set) => ({
	...INITIAL_STATE,
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
	closeSidebar: () => set({ isOpen: false }),
});
