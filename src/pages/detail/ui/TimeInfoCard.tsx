import { formatFcstTime } from '@/entities/whether/lib/weatherEmoji';

type TimeInfoCardProps = {
	baseDate: string;
	baseTime: string;
	fcstDate: string;
	fcstTime: string;
};

const TimeInfoCard = ({ baseDate, baseTime, fcstDate, fcstTime }: TimeInfoCardProps) => {
	return (
		<div className="mb-4 flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
			<div className="flex-1">
				<div className="mb-0.5 text-[10px] text-white/40">발표시각</div>
				<div className="text-[12px] text-white/70">
					{formatFcstTime(baseDate, baseTime)}
				</div>
			</div>
			<div className="flex-1">
				<div className="mb-0.5 text-[10px] text-white/40">예보시각</div>
				<div className="text-[12px] text-white/70">
					{fcstDate && fcstTime ? formatFcstTime(fcstDate, fcstTime) : '-'}
				</div>
			</div>
		</div>
	);
};

export default TimeInfoCard;
