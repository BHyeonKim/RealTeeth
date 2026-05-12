import { useNavigate } from 'react-router';

import { Favorite } from '@/features/favorite';
import Backdrop from '@/shared/ui/Backdrop';

const FavoritePage = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<Backdrop onClickBackdrop={handleBack}>
			<Favorite onClose={handleBack} />
		</Backdrop>
	);
};

export default FavoritePage;
