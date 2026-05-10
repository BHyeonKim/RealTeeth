import { useQuery } from '@tanstack/react-query';

import type { GridCoord } from '@/shared/types/coordinates.type';
import WhetherService from '../apis/WhetherService';
import { VilageForecastOption } from '../apis/whetherQueryOptions';

const useVilageForecast = (gridCoord: GridCoord) => {
	const { baseDate, baseTime } = WhetherService.getBaseDate();
	const { data, ...rest } = useQuery(
		VilageForecastOption(gridCoord, baseDate, baseTime),
	);

	const vilageForcaseDataKey = `${baseDate}_${baseTime}`;
	const vilageForcaseData = data?.[vilageForcaseDataKey];

	return { data: vilageForcaseData, ...rest };
};

export default useVilageForecast;
