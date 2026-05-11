import Icon from '@/shared/ui/Icon';
import type { SearchLocation } from '../types/search.type';

export type SearchItemProps = SearchLocation & {
	temperature?: number;
	weatherEmoji?: string;
	onClick?: () => void;
};

const SearchItem = ({
	name,
	region,
	address,
	temperature,
	weatherEmoji,
	onClick,
}: SearchItemProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
		>
			<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-400/10">
				<Icon name="IconLocationOutline" width={16} />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-1.5">
					<span className="font-semibold text-[13px] text-black">{name}</span>
					<span className="text-[11px] text-black">{region}</span>
				</div>
				<div className="text-[11px] text-black">{address}</div>
			</div>

			<div className="shrink-0 text-right">
				<div className="font-bold text-[15px] text-emerald-400">
					{temperature}°
				</div>
				<div className="text-[14px]">{weatherEmoji}</div>
			</div>
		</button>
	);
};

export default SearchItem;
