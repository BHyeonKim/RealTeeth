import { useNavigate } from 'react-router';

import {
	DEFAULT_PTY,
	DEFAULT_SKY,
} from '@/entities/whether/consts/whether.const';
import useVilageForecast from '@/entities/whether/hooks/useVilageForecast';
import { getWeatherInfo } from '@/entities/whether/lib/weatherEmoji';
import Icon from '@/shared/ui/Icon';

import type { Favorite } from '../types/favorite.type';

type FavoriteItemProps = Favorite & {
	onDelete: () => void;
};

const FavoriteItem = ({
	name,
	region,
	gridCoord,
	onDelete,
}: FavoriteItemProps) => {
	const navigate = useNavigate();
	const { data } = useVilageForecast(gridCoord);

	const pty = data?.PTY?.fcstValue ?? DEFAULT_PTY;
	const sky = data?.SKY?.fcstValue ?? DEFAULT_SKY;
	const { emoji } = getWeatherInfo(pty, sky);

	const temperature = data?.TMP?.fcstValue ?? '-';
	const minTemperature = data?.TMN?.fcstValue ?? '-';
	const maxTemperature = data?.TMX?.fcstValue ?? '-';

	const handleClick = () => {
		navigate(
			`/detail?nx=${gridCoord.nx}&ny=${gridCoord.ny}&name=${encodeURIComponent(name)}&region=${encodeURIComponent(region)}`,
		);
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="group relative w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-left transition-colors hover:bg-white/10"
		>
			<div className="mb-2 flex items-center justify-between">
				<div className="flex min-w-0 flex-1 items-center gap-1.5">
					<span className="truncate font-semibold text-[13px] text-white">
						{name}
					</span>
					<span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">
						{region}
					</span>
				</div>
				<button
					type="button"
					onClick={handleDelete}
					className="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-400/15"
					aria-label="즐겨찾기 삭제"
				>
					<Icon
						name="IconTrash"
						width={12}
						height={12}
						className="text-red-400"
						aria-hidden="true"
					/>
				</button>
			</div>

			<div className="flex items-end justify-between">
				<div className="flex items-baseline gap-1">
					<span className="font-bold text-8 text-[32px] text-emerald-400 leading-none">
						{temperature}
					</span>
					<span className="text-base text-white/40">°C</span>
					<span className="ml-1 text-lg">{emoji}</span>
				</div>
				<div className="flex gap-3">
					<div className="flex flex-col items-center">
						<span className="font-semibold text-[10px] text-blue-400">
							최저
						</span>
						<span className="font-semibold text-[13px] text-white/70">
							{minTemperature}°
						</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="font-semibold text-[10px] text-orange-400">
							최고
						</span>
						<span className="font-semibold text-[13px] text-white/70">
							{maxTemperature}°
						</span>
					</div>
				</div>
			</div>
		</button>
	);
};

export default FavoriteItem;
