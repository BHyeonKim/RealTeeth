import { useMap } from 'react-naver-maps';

import type { Coordinates } from '@/shared/types/coordinates.type';
import { CircleButton } from '@/shared/ui/CircleButton';
import Icon from '@/shared/ui/Icon';

type CurrentLocationButtonProps = {
	coordinates: Coordinates | null;
};

const CurrentLocationButton = ({ coordinates }: CurrentLocationButtonProps) => {
	const map = useMap();

	const handleCurrentLocation = () => {
		if (!coordinates) return;

		map.panTo(coordinates);
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
