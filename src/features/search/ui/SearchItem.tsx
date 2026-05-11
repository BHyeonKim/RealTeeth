import { Link, useNavigate } from 'react-router';

import useVilageForecast from '@/entities/whether/hooks/useVilageForecast';
import Icon from '@/shared/ui/Icon';
import type { SearchLocation } from '../types/search.type';

export type SearchItemProps = SearchLocation;

type SearchItemComponentProps = SearchItemProps & {
	onItemClick?: () => void;
};

const SearchItem = ({ name, region, address, gridCoord, onItemClick }: SearchItemComponentProps) => {
	const { data, isLoading } = useVilageForecast(gridCoord ?? { nx: 0, ny: 0 });
	const navigate = useNavigate();
	const temperature = data?.TMP?.fcstValue ?? '-';
	const isTemperatureExists = !!gridCoord;
	const isTemperatureLoading = isLoading && isTemperatureExists;

	const handleClick = () => {
		if (!gridCoord) return;
		onItemClick?.();
		navigate(
			`/detail?nx=${gridCoord?.nx ?? ''}&ny=${gridCoord?.ny ?? ''}&name=${encodeURIComponent(name)}&region=${encodeURIComponent(region)}`,
		);
	};

	return (
		<li>
			<button
				onClick={handleClick}
				type="button"
				className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${isTemperatureExists ? 'cursor-pointer' : 'cursor-not-allowed'}`}
				disabled={!isTemperatureExists}
			>
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-400/10">
					<Icon name="IconLocationOutline" width={16} />
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-1.5">
						<span className="font-semibold text-[13px] text-black">{name}</span>
						<span className="text-[11px] text-black">{region}</span>
					</div>
					<div className="text-[11px] text-black">{address}</div>
				</div>

				<div className="shrink-0 text-right">
					{!isTemperatureExists ? (
						<div className="text-[8px] text-gray-400">
							해당 장소의 정보가 제공되지 않습니다.
						</div>
					) : isTemperatureLoading ? (
						<div className="h-5 w-8 animate-pulse rounded bg-gray-200" />
					) : (
						<div className="font-bold text-[15px] text-emerald-400">
							{temperature}°
						</div>
					)}
				</div>
			</button>
		</li>
	);
};

export default SearchItem;
