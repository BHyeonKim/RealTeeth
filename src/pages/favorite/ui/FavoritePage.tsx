import { Navigate, useNavigate } from 'react-router';

import { Favorite } from '@/features/favorite';
import useDeviceSize from '@/shared/hooks/useDeviceSize';
import Backdrop from '@/shared/ui/Backdrop';

const FavoritePage = () => {
	const navigate = useNavigate();
	const device = useDeviceSize();

	const handleBack = () => {
		navigate(-1);
	};

	if (device === 'mobile') {
		return <Navigate to="/" replace />;
	}

	return (
		<Backdrop onClickBackdrop={handleBack}>
			<Favorite onClose={handleBack} />
		</Backdrop>
	);
};

export default FavoritePage;
