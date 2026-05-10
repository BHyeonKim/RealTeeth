import { useState } from 'react';
import { useListener, useMap } from 'react-naver-maps';

const useZoomLevel = () => {
	const map = useMap();
	const [zoomLevel, setZoomLevel] = useState(map.getZoom());

	useListener(map, 'zoom_changed', () => {
		setZoomLevel(map.getZoom());
	});

	return zoomLevel;
};

export default useZoomLevel;
