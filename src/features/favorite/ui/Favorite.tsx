import { motion } from 'motion/react';

import CloseButton from '@/shared/ui/CloseButton';
import { MAX_FAVORITES } from '../consts/favorite.const';
import { useFavoriteStore } from '../model/useFavoriteStore';
import FavoriteItemList from './FavoriteItemList';

type FavoriteProps = {
	onClose: () => void;
};

const Favorite = ({ onClose }: FavoriteProps) => {
	const favorites = useFavoriteStore((state) => state.favorites);

	return (
		<motion.div
			initial={{ x: '-100%' }}
			animate={{ x: 0 }}
			exit={{ x: '-100%' }}
			transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
			className="fixed top-0 left-0 z-20 flex h-full w-80 flex-col border-white/10 border-r bg-black/60 shadow-[8px_0_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
		>
			<div className="flex shrink-0 items-center justify-between border-white/10 border-b px-5 py-4">
				<div className="flex items-center gap-2">
					<span className="text-base text-violet-300">★</span>
					<span className="font-semibold text-[15px] text-white">즐겨찾기</span>
					<span className="rounded-full bg-violet-400/20 px-1.5 py-0.5 font-semibold text-violet-300 text-xs">
						{favorites.length}/{MAX_FAVORITES}
					</span>
				</div>
				<CloseButton onClick={onClose} />
			</div>

			<div className="scrollbar-hide flex-1 overflow-y-auto p-4">
				<FavoriteItemList favorites={favorites} />
			</div>

			<div className="shrink-0 border-white/5 border-t px-5 py-3">
				<p className="text-center text-[11px] text-white/25">
					카드를 클릭하면 날씨 상세를 볼 수 있어요
				</p>
			</div>
		</motion.div>
	);
};

export default Favorite;
