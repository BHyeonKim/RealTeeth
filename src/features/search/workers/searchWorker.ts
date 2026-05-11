import koreaDistricts from '@/shared/data/korea_districts.json';

import type { SearchLocation } from '../types/search.type';

const parseAddress = (district: string): SearchLocation => {
	const address = district.split('-');

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
};

self.onmessage = (e: MessageEvent<string>) => {
	const query = e.data;

	if (!query) {
		self.postMessage([]);
		return;
	}

	const results = koreaDistricts
		.filter((district) => district.includes(query))
		.slice(0, 50)
		.map(parseAddress);

	self.postMessage(results);
};
