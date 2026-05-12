import { useQuery } from '@tanstack/react-query';

import type { GridCoord } from '@/shared/types/coordinates.type';
import WhetherService from '../apis/WhetherService';
import { VilageForecastOption } from '../apis/whetherQueryOptions';

const useVilageForecast = (gridCoord: GridCoord) => {
	const { baseDate, baseTime } = WhetherService.getVilageFcstBaseDateTime();
	const { data, ...rest } = useQuery(
		VilageForecastOption(gridCoord, baseDate, baseTime),
	);

	const sortedSlots = data
		? Object.entries(data)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([, slot]) => slot)
		: [];

	const firstSlot = sortedSlots[0];
	const tmnItem = sortedSlots.find((slot) => slot.TMN)?.TMN;
	const tmxItem = sortedSlots.find((slot) => slot.TMX)?.TMX;

	const vilageForcaseData = firstSlot
		? {
				...firstSlot,
				...(tmnItem ? { TMN: tmnItem } : {}),
				...(tmxItem ? { TMX: tmxItem } : {}),
			}
		: undefined;

	return { data: vilageForcaseData, ...rest };
};

export default useVilageForecast;
