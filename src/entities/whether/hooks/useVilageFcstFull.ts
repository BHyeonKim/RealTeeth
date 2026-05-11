import { useQuery } from '@tanstack/react-query';

import type { GridCoord } from '@/shared/types/coordinates.type';

import WhetherService from '../apis/WhetherService';
import { VilageForecastOption } from '../apis/whetherQueryOptions';

const useVilageFcstFull = (gridCoord: GridCoord) => {
	const { baseDate, baseTime } = WhetherService.getVilageFcstBaseDateTime();
	const { data, ...rest } = useQuery(
		VilageForecastOption(gridCoord, baseDate, baseTime),
	);

	const hourlySlots = data
		? Object.entries(data)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([, slot]) => slot)
		: [];

	const currentSlot = hourlySlots[0];

	return { currentSlot, hourlySlots, baseDate, baseTime, ...rest };
};

export default useVilageFcstFull;
