import { useEffect } from 'react';
import { useMap } from 'react-naver-maps';
import { useSearchParams } from 'react-router';

import { findTownByGridCoord } from '../lib/findTownByGridCoord';

const MapCenterSync = () => {
	const map = useMap();
	const [searchParams] = useSearchParams();
	const nx = Number(searchParams.get('nx'));
	const ny = Number(searchParams.get('ny'));
	const source = searchParams.get('source');

	useEffect(() => {
		if (!nx || !ny) return;
		if (source === 'marker') return;

		const town = findTownByGridCoord(nx, ny);
		if (!town) return;

		map.setCenter({ lat: town.lat, lng: town.lng });
	}, [nx, ny, map, source]);

	return null;
};

export default MapCenterSync;
