import {
	DEFAULT_PTY,
	DEFAULT_SKY,
} from '@/entities/whether/consts/whether.const';
import { getWeatherInfo } from '@/entities/whether/lib/weatherEmoji';
import type {
	VilageFcstCategory,
	VilageFcstItem,
} from '@/entities/whether/types/whetherApi.type';

type HourlyForecastProps = {
	slots: Record<VilageFcstCategory, VilageFcstItem>[];
};

const HourlyForecast = ({ slots }: HourlyForecastProps) => {
	return (
		<div className="mb-5">
			<div className="mb-2 text-[12px] text-white/40">시간대별 기온</div>
			<div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
				{slots.map((slot) => {
					const pty = slot.PTY?.fcstValue ?? DEFAULT_PTY;
					const sky = slot.SKY?.fcstValue ?? DEFAULT_SKY;

					const { emoji } = getWeatherInfo(pty, sky);
					const time = `${slot.TMP?.fcstTime?.slice(0, 2)}:00`;

					return (
						<div
							key={`${slot.TMP?.fcstDate}_${slot.TMP?.fcstTime}`}
							className="flex shrink-0 flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
						>
							<span className="text-[11px] text-white/50">{time}</span>
							<span className="text-base">{emoji}</span>
							<span className="font-semibold text-[13px] text-white">
								{slot.TMP?.fcstValue ?? '-'}°
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default HourlyForecast;
