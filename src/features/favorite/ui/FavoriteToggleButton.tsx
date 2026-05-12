import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useFavoriteStore } from '../model/useFavoriteStore';

type FavoriteToggleButtonProps = {
	className?: string;
};

const FavoriteToggleButton = ({ className }: FavoriteToggleButtonProps) => {
	const navigate = useNavigate();
	const favorites = useFavoriteStore((state) => state.favorites);

	return (
		<button
			type="button"
			onClick={() => navigate('/favorite')}
			className={twMerge(
				'flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 shadow-lg backdrop-blur-xl',
				className,
			)}
			aria-label="즐겨찾기 열기"
		>
			<span className="text-gray-600 text-sm">☆</span>
			<span className="font-semibold text-[13px] text-gray-700">즐겨찾기</span>
			{favorites.length > 0 && (
				<span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-400/30 font-semibold text-[11px] text-violet-800">
					{favorites.length}
				</span>
			)}
		</button>
	);
};

export default FavoriteToggleButton;
