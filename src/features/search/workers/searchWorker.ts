import koreaDistricts from '@/shared/data/korea_districts.json';
import weatherGrid from '@/shared/data/weatherGrid.const.json';
import type { GridCoord } from '@/shared/types/coordinates.type';
import type { SearchLocation } from '../types/search.type';

/**
 * 주소에서 날씨 격자 좌표를 찾는 함수
 * @param address - 주소 배열 (예: ["서울특별시", "종로구", "청운동"])
 * @returns 날씨 격자 좌표 또는 undefined
 */
const findGridCoord = (address: string[]): GridCoord | undefined => {
	const state = weatherGrid.state.find((s) => s.name === address[0]);
	if (!state) return undefined;

	if (address.length === 1) {
		const town = state.cities[0]?.towns[0];
		return town ? { nx: town.nx, ny: town.ny } : undefined;
	}

	const city = state.cities.find((c) => c.name === address[1]);
	if (!city) return undefined;

	if (address.length === 2) {
		const town = city.towns[0];
		return town ? { nx: town.nx, ny: town.ny } : undefined;
	}

	const town = city.towns.find((t) => t.name === address[2]);
	return town ? { nx: town.nx, ny: town.ny } : undefined;
};

/**
 * 주소를 파싱하여 검색 결과 객체를 생성하는 함수
 * @param district - "-"로 구분된 주소 문자열 (예: "서울특별시-종로구-청운동")
 * @returns 검색 결과 객체
 */
const parseAddress = (district: string): SearchLocation => {
	const address = district.split('-');
	const gridCoord = findGridCoord(address);

	if (address.length === 4) {
		const regionUnit = address[3].at(-1);
		return {
			region: address[0],
			name: address[3],
			address: `${address[0]} ${address[1]} ${address[2]} ${address[3]} · ${regionUnit}`,
			gridCoord,
		};
	}

	if (address.length === 3) {
		const regionUnit = address[2].at(-1);
		return {
			region: address[0],
			name: address[2],
			address: `${address[0]} ${address[1]} ${address[2]} · ${regionUnit}`,
			gridCoord,
		};
	}

	if (address.length === 2) {
		const regionUnit = address[1].at(-1);
		return {
			region: address[0],
			name: address[1],
			address: `${address[0]} ${address[1]} · ${regionUnit}`,
			gridCoord,
		};
	}

	const regionUnit = address[0].at(-1);
	return {
		region: address[0],
		name: address[0],
		address: `${address[0]} · ${regionUnit}`,
		gridCoord,
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
