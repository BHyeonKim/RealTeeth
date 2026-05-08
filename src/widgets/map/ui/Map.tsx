import { Container as MapDiv, NaverMap } from 'react-naver-maps';

const WeatherMap = () => {
	return (
		<MapDiv className="h-full w-full">
			<NaverMap />
		</MapDiv>
	);
};

export default WeatherMap;
