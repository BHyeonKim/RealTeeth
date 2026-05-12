import { useMemo } from 'react';
import { CustomOverlay } from 'react-naver-maps';

import weatherGridPoints from '@/shared/data/weatherGrid.const.json';
import { WEATHER_MARKER_ZOOM_LEVEL } from '../consts/location.const';
import useBounds from '../hooks/useBounds';
import useZoomLevel from '../hooks/useZoomLevel';
import WeatherMarker from './WeatherMarker';

const WhetherMarkers = () => {
	const bounds = useBounds();
	const zoomLevel = useZoomLevel();

	const candidatePoints = useMemo(() => {
		if (zoomLevel < WEATHER_MARKER_ZOOM_LEVEL.CITY_MIN) {
			return weatherGridPoints.state.map((s) => ({
				...s.cities[0].towns[0],
				name: s.name,
				region: '',
			}));
		} else if (zoomLevel < WEATHER_MARKER_ZOOM_LEVEL.TOWN_MIN) {
			return weatherGridPoints.state.flatMap((s) =>
				s.cities
					.filter((c) => c.name !== '')
					.map((c) => ({
						...c.towns[0],
						name: c.name,
						region: s.name,
					})),
			);
		} else {
			return weatherGridPoints.state.flatMap((s) =>
				s.cities
					.filter((c) => c.name !== '')
					.flatMap((c) =>
						c.towns
							.filter((t) => t.name !== '')
							.map((t) => ({ ...t, region: c.name })),
					),
			);
		}
	}, [zoomLevel]);

	const visiblePoints = useMemo(() => {
		return candidatePoints.filter((point) =>
			bounds.hasLatLng(new naver.maps.LatLng(point.lat, point.lng)),
		);
	}, [bounds, candidatePoints]);

	return (
		<>
			{visiblePoints.map((point) => (
				<CustomOverlay
					key={`${zoomLevel}-${point.name}`}
					position={{ lat: point.lat, lng: point.lng }}
				>
					<WeatherMarker
						name={point.name}
						region={point.region}
						nx={point.nx}
						ny={point.ny}
					/>
				</CustomOverlay>
			))}
		</>
	);
};

export default WhetherMarkers;
