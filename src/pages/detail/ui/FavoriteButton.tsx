import type { FavoriteType } from '@/features/favorite';
import { useFavoriteStore } from '@/features/favorite';

type FavoriteButtonProps = {
	favorite: FavoriteType;
};

const FavoriteButton = ({ favorite }: FavoriteButtonProps) => {
	const favorites = useFavoriteStore((state) => state.favorites);
	const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

	const isFavorited = favorites.some(
		(f) => f.name === favorite.name && f.region === favorite.region,
	);

	return (
		<button
			type="button"
			onClick={() => toggleFavorite(favorite)}
			className="w-full cursor-pointer rounded-xl border border-violet-400/30 bg-violet-400/20 py-3 font-semibold text-sm text-violet-300"
		>
			{isFavorited ? '★ 즐겨찾기됨' : '☆ 즐겨찾기 추가'}
		</button>
	);
};

export default FavoriteButton;
