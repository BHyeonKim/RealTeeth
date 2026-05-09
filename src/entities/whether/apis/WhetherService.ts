import { whetherApiClient } from '@/shared/configs/whetherApi.config';
import type { Coordinates, GridCoord } from '@/shared/types/coordinates.type';
import { transCoordinatesToGrid } from '@/shared/utils/lambertConformalConicProject';
import type { IWeatherService, WeatherInfo } from '../types/whether.type';
import type {
	UltraSrtNcstItem,
	UltraSrtNcstItemMap,
	UltraSrtNcstResponse,
	VilageFcstItem,
	VilageFcstItemMap,
	VilageFcstResponse,
} from '../types/whetherApi.type';

export default class WhetherService implements IWeatherService {
	private readonly apiClient = whetherApiClient;

	getWeatherInfo(coordinates: Coordinates): Promise<WeatherInfo> {
		const gridCoord = this.transCoordinatesToGrid(coordinates);

		throw new Error('Method not implemented.');
	}

	async getNeweastForecast(
		gridCoord: GridCoord,
		baseDate: string,
		baseTime: string,
	) {
		const response = await this.apiClient.get<UltraSrtNcstResponse>(
			'/api/typ02/openApi/VilageFcstInfoService_2.0/getUltraSrtNcst',
			{
				params: {
					...gridCoord,
					base_date: baseDate,
					base_time: baseTime,
					pageNo: 1,
					numOfRows: 1000,
				},
			},
		);

		return this.ultraSrtNcstItemArraytoItemMap(
			response.data.response.body.items.item,
		);
	}

	async getVilageForecast(
		gridCoord: GridCoord,
		baseDate: string,
		baseTime: string,
	) {
		const response = await this.apiClient.get<VilageFcstResponse>(
			'/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst',
			{
				params: {
					...gridCoord,
					base_date: baseDate,
					base_time: baseTime,
					pageNo: 1,
					numOfRows: 1000,
				},
			},
		);

		return this.vilageFcstItemArrayToItemMap(
			response.data.response.body.items.item,
		);
	}

	private transCoordinatesToGrid(coordinates: Coordinates): GridCoord {
		return transCoordinatesToGrid(coordinates);
	}

	private getBaseDate(): { baseDate: string; baseTime: string } {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		return {
			baseDate: `${year}${month}${day}`,
			baseTime: `${hours}${minutes}`,
		};
	}

	private vilageFcstItemArrayToItemMap(
		items: VilageFcstItem[],
	): VilageFcstItemMap {
		const map: VilageFcstItemMap = {};

		for (const item of items) {
			const key = `${item.fcstDate}_${item.fcstTime}`;

			if (!map[key]) {
				map[key] = {} as Record<VilageFcstItem['category'], VilageFcstItem>;
			}
			map[key][item.category] = item;
		}

		return map;
	}

	private ultraSrtNcstItemArraytoItemMap(
		items: UltraSrtNcstItem[],
	): UltraSrtNcstItemMap {
		return Object.fromEntries(
			items.map((item) => [item.category, item]),
		) as UltraSrtNcstItemMap;
	}
}
