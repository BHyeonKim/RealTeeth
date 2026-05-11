import { type ChangeEvent, useMemo, useState } from 'react';

import koreaDistricts from '@/shared/data/korea_districts.json';
import useDebounceValue from '@/shared/hooks/useDebounceValue';

import type { SearchLocation } from '../types/search.type';

const useSearchLocation = () => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounceValue(query, 500);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.currentTarget.value);
	};

	const filteredDistricts: SearchLocation[] = useMemo(() => {
		if (!debouncedQuery) return [];

		return koreaDistricts
			.filter((district) => district.includes(debouncedQuery))
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
	}, [debouncedQuery]);

	return { filteredDistricts, handleSearch, query };
};

export default useSearchLocation;
