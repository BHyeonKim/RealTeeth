import { useNavigate, useSearchParams } from 'react-router';

import useVilageFcstFull from '@/entities/whether/hooks/useVilageFcstFull';
import { getWeatherInfo } from '@/entities/whether/lib/weatherEmoji';
import Backdrop from '@/shared/ui/Backdrop';

import DetailHeader from './DetailHeader';
import FavoriteButton from './FavoriteButton';
import HourlyForecast from './HourlyForecast';
import TemperatureCard from './TemperatureCard';
import TimeInfoCard from './TimeInfoCard';

const DetailPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const nx = Number(searchParams.get('nx'));
	const ny = Number(searchParams.get('ny'));
	const name = searchParams.get('name') ?? '';
	const region = searchParams.get('region') ?? '';

	const { currentSlot, hourlySlots, baseDate, baseTime, isLoading } =
		useVilageFcstFull({ nx, ny });

	const pty = currentSlot?.PTY?.fcstValue ?? '0';
	const sky = currentSlot?.SKY?.fcstValue ?? '1';
	const { emoji, label } = getWeatherInfo(pty, sky);

	return (
		<Backdrop onClickBackdrop={() => navigate(-1)}>
			<div className="absolute top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
				<DetailHeader
					region={region}
					name={name}
					onClose={() => navigate(-1)}
				/>
				{isLoading ? (
					<div className="flex h-40 items-center justify-center text-white/40">
						로딩 중...
					</div>
				) : (
					<>
						<TemperatureCard
							tmp={currentSlot?.TMP?.fcstValue ?? '-'}
							tmn={currentSlot?.TMN?.fcstValue ?? '-'}
							tmx={currentSlot?.TMX?.fcstValue ?? '-'}
							emoji={emoji}
							label={label}
						/>
						<TimeInfoCard
							baseDate={baseDate}
							baseTime={baseTime}
							fcstDate={currentSlot?.TMP?.fcstDate ?? ''}
							fcstTime={currentSlot?.TMP?.fcstTime ?? ''}
						/>
						<HourlyForecast slots={hourlySlots} />
					</>
				)}
				<FavoriteButton />
			</div>
		</Backdrop>
	);
};

export default DetailPage;
