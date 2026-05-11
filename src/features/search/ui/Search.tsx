import { type ChangeEvent, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import koreaDistricts from '@/shared/data/korea_districts.json';
import type { SearchLocation } from '../types/search.type';
import SearchBar from './SearchBar';
import SearchItemList from './SearchItemList';

type SearchProps = {
	className?: string;
};

const Search = ({ className }: SearchProps) => {
	const [query, setQuery] = useState('');

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.currentTarget.value);
	};

	const filteredDistricts: SearchLocation[] = useMemo(() => {
		if (!query) return [];

		return koreaDistricts
			.filter((district) => district.includes(query))
			.map((district) => district.split('-'))
			.map((address) => {
				if (address.length === 4) {
					const regionUnit = address[3].at(-1);

					return {
						region: address[0],
						name: address[3],
						address: `${address[0]} ${address[1]} ${address[2]} ${address[3]} · ${regionUnit}`,
					};
				}

				if (address.length === 3) {
					const regionUnit = address[2].at(-1);

					return {
						region: address[0],
						name: address[2],
						address: `${address[0]} ${address[1]} ${address[2]} · ${regionUnit}`,
					};
				}

				if (address.length === 2) {
					const regionUnit = address[1].at(-1);

					return {
						region: address[0],
						name: address[1],
						address: `${address[0]} ${address[1]} · ${regionUnit}`,
					};
				}

				const regionUnit = address[0].at(-1);

				return {
					region: address[0],
					name: address[0],
					address: `${address[0]} · ${regionUnit}`,
				};
			});
	}, [query]);

	return (
		<div className={twMerge('w-full max-w-95', className)}>
			<SearchBar onChange={handleSearch} value={query} />
			<SearchItemList className="mt-2" items={filteredDistricts} />
		</div>
	);
};

export default Search;
