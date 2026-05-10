import type { Coordinates } from '@/shared/types/coordinates.type';

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

/** 날씨 조회 */
export interface IWeatherService {
	getWeatherInfo(coordinates: Coordinates): Promise<WeatherInfo>;
}
