import { useMemo, useState } from 'react';
import { CustomOverlay, useListener, useMap } from 'react-naver-maps';

import weatherGridPoints from '@/shared/data/weatherGrid.const.json';
import { WEATHER_MARKER_ZOOM_LEVEL } from '../consts/location.const';
import WeatherMarkerOverlay from './WeatherMarker';

const WhetherMarkers = () => {
	const map = useMap();
	const [bounds, setBounds] = useState(
		map.getBounds() as naver.maps.LatLngBounds,
	);
	const [zoomLevel, setZoomLevel] = useState(map.getZoom());
	useListener(map, 'zoom_changed', () => {
		setZoomLevel(map.getZoom());
	});

	useListener(map, 'bounds_changed', () => {
		setBounds(map.getBounds() as naver.maps.LatLngBounds);
	});

	const candidatePoints = useMemo(() => {
		if (zoomLevel < WEATHER_MARKER_ZOOM_LEVEL.CITY_MIN) {
			// 시/도 대표 좌표
			return weatherGridPoints.state.map((s) => {
				const stateName = s.name;
				return {
					...s.cities[0].towns[0],
					name: stateName,
				};
			});
		} else if (zoomLevel < WEATHER_MARKER_ZOOM_LEVEL.TOWN_MIN) {
			// 구 대표 좌표
			return weatherGridPoints.state.flatMap((s) =>
				s.cities
					.filter((c) => c.name !== '')
					.map((c) => {
						const cityName = c.name;
						return {
							...c.towns[0],
							name: cityName,
						};
					}),
			);
		} else {
			// 모든 동
			return weatherGridPoints.state.flatMap((s) =>
				s.cities.flatMap((c) => c.towns),
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
					<WeatherMarkerOverlay
						name={point.name}
						temperature={21}
						minTemperature={13}
						maxTemperature={26}
					/>
				</CustomOverlay>
			))}
		</>
	);
};

export default WhetherMarkers;
