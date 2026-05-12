import type { UseQueryOptions } from '@tanstack/react-query';

import { ONE_HOUR_MS } from '@/shared/consts/time.const';
import type { GridCoord } from '@/shared/types/coordinates.type';
import type {
	UltraSrtNcstItemMap,
	VilageFcstItemMap,
} from '../types/whetherApi.type';
import WhetherService from './WhetherService';
import { whetherQueryKeys } from './whetherQueryKeys';

export const VilageForecastOption = (
	gridCoord: GridCoord,
	baseDate: string,
	baseTime: string,
): UseQueryOptions<VilageFcstItemMap> => ({
	queryFn: () =>
		WhetherService.getVilageForecast(gridCoord, baseDate, baseTime),
	queryKey: whetherQueryKeys.vilageForecast(gridCoord, baseDate, baseTime),
	staleTime: Infinity,
	gcTime: 3 * ONE_HOUR_MS, // 3시간
});

export const NeweastForecastOption = (
	gridCoord: GridCoord,
	baseDate: string,
	baseTime: string,
): UseQueryOptions<UltraSrtNcstItemMap> => ({
	queryFn: () =>
		WhetherService.getNeweastForecast(gridCoord, baseDate, baseTime),
	queryKey: whetherQueryKeys.neweastForecast(gridCoord, baseDate, baseTime),
});
