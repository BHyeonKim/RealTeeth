import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import useSearchLocation from '../hooks/useSearchLocation';
import SearchBar from './SearchBar';
import SearchItemList from './SearchItemList';

type SearchProps = {
	className?: string;
	onSearchActiveChange?: (active: boolean) => void;
};

const Search = ({ className, onSearchActiveChange }: SearchProps) => {
	const { filteredDistricts, handleSearch, query, clearQuery } =
		useSearchLocation();
	const isSearchActive = query.length > 0 && filteredDistricts.length > 0;

	useEffect(() => {
		onSearchActiveChange?.(isSearchActive);
	}, [isSearchActive, onSearchActiveChange]);

	return (
		<div className={twMerge('w-full max-w-95', className)}>
			<SearchBar onChange={handleSearch} value={query} />
			<SearchItemList
				className="mt-2"
				items={filteredDistricts}
				onItemClick={clearQuery}
			/>
		</div>
	);
};

export default Search;
