import weatherGrid from '@/shared/data/weatherGrid.const.json';

export const findTownByGridCoord = (nx: number, ny: number) => {
	for (const state of weatherGrid.state) {
		for (const city of state.cities) {
			const town = city.towns.find((t) => t.nx === nx && t.ny === ny);
			if (town) return town;
		}
	}
	return undefined;
};
