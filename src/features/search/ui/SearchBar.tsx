import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '@/shared/ui/Icon';

type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

const SearchBar = ({ className, ...props }: SearchBarProps) => {
	return (
		<div
			className={twMerge(
				'flex h-11 w-full max-w-95 items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-200',
				className,
			)}
		>
			<Icon name="IconSearch" width={16} className="text-gray-700" />
			<input
				type="text"
				placeholder="지역명 검색 (예: 종로구, 해운대구)"
				className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-gray-700 outline-none placeholder:text-gray-700"
				{...props}
			/>
		</div>
	);
};

export default SearchBar;
