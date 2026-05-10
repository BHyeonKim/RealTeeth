type WeatherMarkerOverlayProps = {
	name: string;
	temperature: number;
	minTemperature: number;
	maxTemperature: number;
};

const WeatherMarkerOverlay = ({
	name,
	temperature,
	minTemperature,
	maxTemperature,
}: WeatherMarkerOverlayProps) => {
	return (
		<div className="flex h-15 min-w-16 flex-col items-center justify-center rounded-[10px] border border-yellow-400 bg-white px-2 py-1d">
			<span className="mb-0.5 font-semibold text-[9px] text-white/50">
				{name}
			</span>
			<div className="font-bold text-base text-yellow-400 leading-none">
				{temperature}°C
			</div>
			<div className="mt-0.5 flex justify-center gap-2">
				<span className="text-[9px] text-blue-400">↓{minTemperature}</span>
				<span className="text-[9px] text-red-400">↑{maxTemperature}</span>
			</div>
		</div>
	);
};

export default WeatherMarkerOverlay;
