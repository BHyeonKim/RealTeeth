import { Container as MapDiv, NaverMap } from 'react-naver-maps';

import { CurrentLocationButton } from '@/features/location';
import useLocation from '@/shared/hooks/useLocation';

const WeatherMap = () => {
	const { location } = useLocation();

	return (
		<MapDiv className="relative h-full w-full">
			<NaverMap>
				<CurrentLocationButton coordinates={location} />
			</NaverMap>
		</MapDiv>
	);
};

export default WeatherMap;
