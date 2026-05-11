import { twMerge } from 'tailwind-merge';

import useSearchLocation from '../hooks/useSearchLocation';
import SearchBar from './SearchBar';
import SearchItemList from './SearchItemList';

type SearchProps = {
	className?: string;
};

const Search = ({ className }: SearchProps) => {
	const { filteredDistricts, handleSearch, query } = useSearchLocation();

	return (
		<div className={twMerge('w-full max-w-95', className)}>
			<SearchBar onChange={handleSearch} value={query} />
			<SearchItemList className="mt-2" items={filteredDistricts} />
		</div>
	);
};

export default Search;
