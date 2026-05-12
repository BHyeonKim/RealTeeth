import { Container as MapDiv, NaverMap } from 'react-naver-maps';
import { toast } from 'sonner';
import { CurrentLocationButton } from '@/features/location';
import WhetherMarkers from '@/features/location/ui/WhetherMarkers';
import useLocation from '@/shared/hooks/useLocation';

const WeatherMap = () => {
	const { location } = useLocation((error) => {
		toast.error(error.message);
	});

	return (
		<MapDiv className="relative h-full w-full">
			<NaverMap>
				<CurrentLocationButton coordinates={location} />
				<WhetherMarkers />
			</NaverMap>
		</MapDiv>
	);
};

export default WeatherMap;
