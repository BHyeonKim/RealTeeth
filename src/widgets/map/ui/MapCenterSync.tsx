import { useEffect } from 'react';
import { useMap } from 'react-naver-maps';
import { useSearchParams } from 'react-router';

import { findTownByGridCoord } from '../lib/findTownByGridCoord';

const MapCenterSync = () => {
	const map = useMap();
	const [searchParams] = useSearchParams();
	const nx = Number(searchParams.get('nx'));
	const ny = Number(searchParams.get('ny'));

	useEffect(() => {
		if (!nx || !ny) return;
		const town = findTownByGridCoord(nx, ny);
		if (!town) return;
		map.setCenter({ lat: town.lat, lng: town.lng });
		map.setZoom(12);
	}, [nx, ny, map]);

	return null;
};

export default MapCenterSync;
