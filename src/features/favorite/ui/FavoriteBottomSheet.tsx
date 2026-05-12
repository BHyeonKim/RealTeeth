import { Sheet } from 'react-modal-sheet';

import { MAX_FAVORITES } from '../consts/favorite.const';
import { useFavoriteStore } from '../model/useFavoriteStore';
import FavoriteItemList from './FavoriteItemList';

const SNAP_POINTS = [0, 88, 0.55, 1];
const INITIAL_SNAP = 1;

const FavoriteBottomSheet = () => {
	const favorites = useFavoriteStore((state) => state.favorites);

	return (
		<Sheet
			isOpen
			unstyled
			onClose={() => undefined}
			disableDismiss
			disableScrollLocking
			snapPoints={SNAP_POINTS}
			initialSnap={INITIAL_SNAP}
		>
			<Sheet.Container className="overflow-hidden rounded-t-3xl border border-white/10 border-b-0 bg-black/60 shadow-[0_-12px_32px_rgba(0,0,0,0.36)] backdrop-blur-xl">
				<Sheet.Header className="px-5 pt-3 pb-2">
					<div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/25" />
					<div className="flex items-center gap-2">
						<span className="text-base text-violet-300">★</span>
						<span className="font-semibold text-[15px] text-white">
							즐겨찾기
						</span>
						<span className="rounded-full bg-violet-400/20 px-1.5 py-0.5 font-semibold text-violet-300 text-xs">
							{favorites.length}/{MAX_FAVORITES}
						</span>
					</div>
				</Sheet.Header>
				<Sheet.Content className="px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
					<div className="scrollbar-hide max-h-[calc(100dvh-132px)] overflow-y-auto pb-3">
						<FavoriteItemList favorites={favorites} />
					</div>
				</Sheet.Content>
			</Sheet.Container>
		</Sheet>
	);
};

export default FavoriteBottomSheet;
