import { useMap } from 'react-naver-maps';

import { DEFAULT_ZOOM_LEVEL } from '@/features/location/consts/location.const';
import type { Coordinates } from '@/shared/types/coordinates.type';
import { CircleButton } from '@/shared/ui/CircleButton';
import Icon from '@/shared/ui/Icon';

type CurrentLocationButtonProps = {
	coordinates: Coordinates | null;
	zoomLevel?: number;
};

/**
 * 현재 위치로 지도를 이동시키는 버튼 컴포넌트.
 * `useMap`을 사용하므로 반드시 `NaverMap` 컨텍스트 내부에 렌더링해야 한다.
 *
 * @param coordinates - 이동할 좌표. null이면 클릭해도 동작하지 않는다.
 *
 * @example
 * <NaverMap>
 *   <CurrentLocationButton coordinates={location} />
 * </NaverMap>
 */
const CurrentLocationButton = ({
	coordinates,
	zoomLevel,
}: CurrentLocationButtonProps) => {
	const map = useMap();

	const handleCurrentLocation = () => {
		if (!coordinates) return;

		map.setCenter(coordinates);
		map.setZoom(zoomLevel ?? DEFAULT_ZOOM_LEVEL);
	};

	return (
		<CircleButton
			className="fixed right-4 bottom-4 z-10"
			onClick={handleCurrentLocation}
		>
			<Icon name="IconLocationOutline" width={32} height={32} />
		</CircleButton>
	);
};

export default CurrentLocationButton;
