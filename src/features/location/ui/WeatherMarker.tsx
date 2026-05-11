import { useNavigate } from 'react-router';

import useVilageForecast from '@/entities/whether/hooks/useVilageForecast';
import type { GridCoord } from '@/shared/types/coordinates.type';
import WeatherMarkerSkeleton from './WeatherMarkerSkeleton';

type WeatherMarkerProps = {
	name: string;
	region: string;
} & GridCoord;

const WeatherMarker = ({ name, region, ...gridCoord }: WeatherMarkerProps) => {
	const navigate = useNavigate();
	const { data, isLoading, isFetching, isSuccess } =
		useVilageForecast(gridCoord);

	if (isLoading || isFetching) {
		return <WeatherMarkerSkeleton />;
	}

	if (!isSuccess || !data) {
		return <div>에러</div>;
	}

	const temperature = data.TMP?.fcstValue ?? '-';
	const minTemperature = data.TMN?.fcstValue ?? '-';
	const maxTemperature = data.TMX?.fcstValue ?? '-';

	const handleClick = () => {
		navigate(
			`/detail?nx=${gridCoord.nx}&ny=${gridCoord.ny}&name=${encodeURIComponent(name)}&region=${encodeURIComponent(region)}&source=marker`,
		);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="flex h-15 min-w-16 cursor-pointer flex-col items-center justify-center rounded-[10px] border border-yellow-400 bg-white px-2 py-1"
		>
			<span className="mb-0.5 font-semibold text-[9px] text-black">{name}</span>
			<div className="font-bold text-base text-yellow-400 leading-none">
				{temperature}°C
			</div>
			<div className="mt-0.5 flex justify-center gap-2">
				<span className="text-[9px] text-blue-400">↓{minTemperature}</span>
				<span className="text-[9px] text-red-400">↑{maxTemperature}</span>
			</div>
		</button>
	);
};

export default WeatherMarker;
