import { useFavoriteStore } from '../model/useFavoriteStore';
import type { Favorite } from '../types/favorite.type';
import FavoriteItem from './FavoriteItem';

type FavoriteItemListProps = {
	favorites: Favorite[];
};

const FavoriteItemList = ({ favorites }: FavoriteItemListProps) => {
	const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
	const updateAlias = useFavoriteStore((state) => state.updateAlias);

	if (favorites.length === 0) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-[13px] text-white/30">즐겨찾기가 없습니다</p>
			</div>
		);
	}

	return (
		<div className="space-y-2.5">
			{favorites.map((favorite) => (
				<FavoriteItem
					key={`${favorite.name}-${favorite.region}`}
					{...favorite}
					onDelete={() => removeFavorite(favorite.name, favorite.region)}
					onUpdateAlias={(alias) => updateAlias(favorite.name, favorite.region, alias)}
				/>
			))}
		</div>
	);
};

export default FavoriteItemList;
