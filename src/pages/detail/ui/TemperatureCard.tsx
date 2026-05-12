type TemperatureCardProps = {
	tmp: string;
	tmn: string;
	tmx: string;
	emoji: string;
	label: string;
};

const TemperatureCard = ({
	tmp,
	tmn,
	tmx,
	emoji,
	label,
}: TemperatureCardProps) => {
	return (
		<div className="mb-4 flex items-end justify-between">
			<div>
				<div className="font-bold text-7xl text-emerald-400 leading-none">
					{tmp}
					<span className="ml-1 text-3xl text-white/60">°C</span>
				</div>
				<div className="mt-2 flex items-center gap-1.5 text-white/80">
					<span className="text-xl">{emoji}</span>
					<span className="text-sm">{label}</span>
				</div>
			</div>
			<div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-right">
				<div className="mb-1 text-[11px] text-white/40">오늘</div>
				<div className="flex items-center gap-3">
					<div>
						<div className="text-[11px] text-blue-400">최저</div>
						<div className="font-bold text-blue-400 text-lg">{tmn}°</div>
					</div>
					<div>
						<div className="text-[11px] text-orange-400">최고</div>
						<div className="font-bold text-lg text-orange-400">{tmx}°</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TemperatureCard;
