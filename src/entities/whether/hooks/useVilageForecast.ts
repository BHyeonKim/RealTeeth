import { useQuery } from '@tanstack/react-query';

import type { GridCoord } from '@/shared/types/coordinates.type';
import WhetherService from '../apis/WhetherService';
import { VilageForecastOption } from '../apis/whetherQueryOptions';

const useVilageForecast = (gridCoord: GridCoord) => {
	const { baseDate, baseTime } = WhetherService.getVilageFcstBaseDateTime();
	const { data, ...rest } = useQuery(
		VilageForecastOption(gridCoord, baseDate, baseTime),
	);

	const vilageForcaseData = data
		? Object.entries(data).sort(([a], [b]) => a.localeCompare(b))[0]?.[1]
		: undefined;

	return { data: vilageForcaseData, ...rest };
};

export default useVilageForecast;
