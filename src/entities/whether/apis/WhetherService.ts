import { whetherApiClient } from '@/shared/configs/whetherApi.config';
import type { GridCoord } from '@/shared/types/coordinates.type';
import {
	VILAGE_FORECAST_BASE_TIMES,
	VILAGE_FORECAST_BUFFER_MINUTES,
} from '../consts/whether.const';
import type {
	IWeatherService,
	WeatherBaseDateTime,
} from '../types/whether.type';
import type {
	UltraSrtNcstItem,
	UltraSrtNcstItemMap,
	UltraSrtNcstResponse,
	VilageFcstItem,
	VilageFcstItemMap,
	VilageFcstResponse,
} from '../types/whetherApi.type';

class WhetherService implements IWeatherService {
	private readonly apiClient = whetherApiClient;

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
	 * 단기예보 기준일자와 기준시각을 반환
	 * 발표시각(0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300) 기준으로
	 * API 제공 시작(발표 후 10분)을 고려해 가장 최근 유효한 시각을 반환
	 */
	getVilageFcstBaseDateTime(): WeatherBaseDateTime {
		const now = new Date();
		const currentMinutes = now.getHours() * 100 + now.getMinutes();

		for (const baseTime of [...VILAGE_FORECAST_BASE_TIMES].reverse()) {
			if (
				currentMinutes >=
				parseInt(baseTime, 10) + VILAGE_FORECAST_BUFFER_MINUTES
			) {
				return { baseDate: this.formatDate(now), baseTime };
			}
		}

		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		return { baseDate: this.formatDate(yesterday), baseTime: '2300' };
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

			if (!map[key][item.category]) {
				map[key][item.category] = item;
			}
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

	/**
	 * Date 객체를 YYYYMMDD 형식의 문자열로 변환
	 * @param date Date 객체
	 * @returns YYYYMMDD 형식의 문자열
	 */
	private formatDate(date: Date) {
		return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
	}
}

export default new WhetherService();
