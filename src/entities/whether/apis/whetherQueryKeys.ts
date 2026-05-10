import type { GridCoord } from '@/shared/types/coordinates.type';

export const whetherQueryKeys = {
	all: ['whether'] as const,
	neweastForecastAll: () => [...whetherQueryKeys.all, 'neweastForecast'],
	vilageForecastAll: () => [...whetherQueryKeys.all, 'vilageForecast'],
	neweastForecast: (gridCoord: GridCoord, ...args: unknown[]) => [
		...whetherQueryKeys.neweastForecastAll(),
		...Object.values(gridCoord),
		...args,
	],
	vilageForecast: (gridCoord: GridCoord, ...args: unknown[]) => [
		...whetherQueryKeys.vilageForecastAll(),
		...Object.values(gridCoord),
		...args,
	],
};
