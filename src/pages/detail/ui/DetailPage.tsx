import { useNavigate, useSearchParams } from 'react-router';
import Backdrop from '@/shared/ui/Backdrop';

const DetailPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const nx = searchParams.get('nx');
	const ny = searchParams.get('ny');

	if (!nx || !ny) {
		return null;
	}

	return (
		<Backdrop onClickBackdrop={() => navigate(-1)}>
			<div className="absolute inset-48 flex items-center justify-center">
				<div className="h-full w-full rounded-lg bg-white p-4">
					{nx}, {ny}
				</div>
			</div>
		</Backdrop>
	);
};

export default DetailPage;
