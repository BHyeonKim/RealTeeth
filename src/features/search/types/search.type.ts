import type { GridCoord } from '@/shared/types/coordinates.type';

export type SearchLocation = {
	name: string;
	region: string;
	address: string;
	gridCoord?: GridCoord;
};
