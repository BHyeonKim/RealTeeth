const WeatherMarkerSkeleton = () => {
	return (
		<div className="flex h-15 min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border border-yellow-400 bg-white px-2 py-1">
			<div className="h-2 w-8 animate-pulse rounded bg-gray-200" />
			<div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
			<div className="flex gap-2">
				<div className="h-2 w-4 animate-pulse rounded bg-gray-200" />
				<div className="h-2 w-4 animate-pulse rounded bg-gray-200" />
			</div>
		</div>
	);
};

export default WeatherMarkerSkeleton;
