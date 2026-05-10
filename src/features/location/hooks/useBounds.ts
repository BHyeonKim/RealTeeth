import { useState } from 'react';
import { useListener, useMap } from 'react-naver-maps';

const useBounds = () => {
	const map = useMap();
	const [bounds, setBounds] = useState(
		map.getBounds() as naver.maps.LatLngBounds,
	);

	useListener(map, 'bounds_changed', () => {
		setBounds(map.getBounds() as naver.maps.LatLngBounds);
	});

	return bounds;
};

export default useBounds;
