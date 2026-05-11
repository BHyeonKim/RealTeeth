import { useEffect, useRef, useState } from 'react';

const useDebounceValue = <T,>(value: T, delay: number = 500) => {
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const [debouncedValue, setDebouncedValue] = useState<T>();

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounceValue;
