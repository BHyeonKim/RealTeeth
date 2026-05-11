import { twMerge } from 'tailwind-merge';

import SearchItem, { type SearchItemProps } from './SearchItem';

type SearchItemListProps = {
	items: SearchItemProps[];
	className?: string;
};

const SearchItemList = ({ items, className }: SearchItemListProps) => {
	return (
		<div
			className={twMerge(
				'scrollbar-hide absolute top-full right-0 left-0 z-50 max-h-90 w-full max-w-95 overflow-hidden overflow-y-scroll rounded-2xl border border-white/15 bg-white/10 shadow-[0_16px_40px_-4px_rgba(0,0,0,0.5)] backdrop-blur-xl',
				className,
			)}
		>
			{items.map((item) => (
				<SearchItem key={`${item.name}-${item.address}`} {...item} />
			))}
		</div>
	);
};

export default SearchItemList;
