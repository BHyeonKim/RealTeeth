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

	/**
	 * 초단기실황 조회
	 * @param gridCoord 격자 좌표
	 * @param baseDate 기준일자
	 * @param baseTime 기준시각
	 * @returns 초단기실황 조회 응답
	 */
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

	/**
	 * 단기예보 조회
	 * @param gridCoord 격자 좌표
	 * @param baseDate 기준일자
	 * @param baseTime 기준시각
	 * @returns 단기예보 조회 응답
	 */
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

	/**
	 * 좌표를 격자 좌표로 변환
	 * @param coordinates 좌표
	 * @returns 격자 좌표
	 */
	private transCoordinatesToGrid(coordinates: Coordinates): GridCoord {
		return transCoordinatesToGrid(coordinates);
	}

	/**
	 * 기준일자와 기준시각을 반환
	 * @returns 기준일자와 기준시각
	 */
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

	/**
	 * 단기예보 아이템 배열을 아이템 맵으로 변환
	 * @param items 단기예보 아이템 배열
	 * @returns 단기예보 아이템 맵
	 */
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

	/**
	 * 초단기실황 아이템 배열을 아이템 맵으로 변환
	 * @param items 초단기실황 아이템 배열
	 * @returns 초단기실황 아이템 맵
	 */
	private ultraSrtNcstItemArraytoItemMap(
		items: UltraSrtNcstItem[],
	): UltraSrtNcstItemMap {
		return Object.fromEntries(
			items.map((item) => [item.category, item]),
		) as UltraSrtNcstItemMap;
	}
}
