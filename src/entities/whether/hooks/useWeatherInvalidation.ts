import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { whetherQueryKeys } from '../apis/whetherQueryKeys';
import {
	VILAGE_FORECAST_BASE_TIMES,
	VILAGE_FORECAST_BUFFER_MINUTES,
} from '../consts/whether.const';

const getVilageFcstRefetchDelay = (): number => {
	const now = new Date();
	const currentMinutes = now.getHours() * 100 + now.getMinutes();

	for (const baseTime of VILAGE_FORECAST_BASE_TIMES) {
		const announceMinutes =
			parseInt(baseTime, 10) + VILAGE_FORECAST_BUFFER_MINUTES;

		if (currentMinutes < announceMinutes) {
			const target = new Date(now);
			target.setHours(
				Math.floor(announceMinutes / 100),
				announceMinutes % 100,
				0,
				0,
			);

			return target.getTime() - now.getTime();
		}
	}

	const tomorrow = new Date(now);
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(2, 10, 0, 0);
	return tomorrow.getTime() - now.getTime();
};

const useWeatherInvalidation = () => {
	const queryClient = useQueryClient();
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const schedule = useCallback(() => {
		timerRef.current = setTimeout(() => {
			queryClient.invalidateQueries({
				queryKey: whetherQueryKeys.vilageForecastAll(),
			});
			schedule();
		}, getVilageFcstRefetchDelay());
	}, [queryClient]);

	useEffect(() => {
		schedule();

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [schedule]);
};

export default useWeatherInvalidation;
