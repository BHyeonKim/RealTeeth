import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import useDebounceValue from '@/shared/hooks/useDebounceValue';
import type { SearchLocation } from '../types/search.type';

const useSearchLocation = () => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounceValue(query, 500);
	const [filteredDistricts, setFilteredDistricts] = useState<SearchLocation[]>(
		[],
	);
	const workerRef = useRef<Worker | null>(null);

	useEffect(() => {
		workerRef.current = new Worker(
			new URL('../workers/searchWorker.ts', import.meta.url),
			{ type: 'module' },
		);

		workerRef.current.onmessage = (e: MessageEvent<SearchLocation[]>) => {
			setFilteredDistricts(e.data);
		};

		return () => workerRef.current?.terminate();
	}, []);

	useEffect(() => {
		workerRef.current?.postMessage(debouncedQuery);
	}, [debouncedQuery]);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.currentTarget.value);
	};

	return { filteredDistricts, handleSearch, query };
};

export default useSearchLocation;
