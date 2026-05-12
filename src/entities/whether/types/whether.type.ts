import type { GridCoord } from '@/shared/types/coordinates.type';
import type { UltraSrtNcstItemMap, VilageFcstItemMap } from './whetherApi.type';

/** 현재 기상 실황 */
export type CurrentWeather = {
	temperature: number;
	precipitationType: 'none' | 'rain' | 'snow' | 'shower';
	windSpeed: number;
	humidity: number;
};

/** 당일 최저/최고 */
export type DailyTemperature = {
	min: number;
	max: number;
};

/** 시간대별 예보 */
export type HourlyForecast = {
	time: string;
	temperature: number;
};

/** 날씨 정보 */
export type WeatherInfo = {
	current: CurrentWeather;
	daily: DailyTemperature;
	hourly: HourlyForecast[];
	announcedAt: string; // 발표시각
	forecastedAt: string; // 예보시각
};

export type WeatherBaseDateTime = {
	baseDate: string;
	baseTime: string;
};

/** 날씨 조회 */
export interface IWeatherService {
	getNeweastForecast(
		gridCoord: GridCoord,
		baseDate: string,
		baseTime: string,
	): Promise<UltraSrtNcstItemMap>;
	getVilageForecast(
		gridCoord: GridCoord,
		baseDate: string,
		baseTime: string,
	): Promise<VilageFcstItemMap>;
	getVilageFcstBaseDateTime(): WeatherBaseDateTime;
}
