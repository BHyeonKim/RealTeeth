import { DEFAULT_PTY } from '../consts/whether.const';

type WeatherInfo = { emoji: string; label: string };

const SKY_MAP: Record<string, WeatherInfo> = {
	'1': { emoji: '☀️', label: '맑음' },
	'3': { emoji: '⛅', label: '구름많음' },
	'4': { emoji: '☁️', label: '흐림' },
};

const PTY_MAP: Record<string, WeatherInfo> = {
	'1': { emoji: '🌧️', label: '비' },
	'2': { emoji: '🌨️', label: '비/눈' },
	'3': { emoji: '❄️', label: '눈' },
	'5': { emoji: '🌦️', label: '빗방울' },
	'6': { emoji: '🌨️', label: '빗방울눈날림' },
	'7': { emoji: '🌨️', label: '눈날림' },
};

export const getWeatherInfo = (pty: string, sky: string): WeatherInfo => {
	if (pty !== DEFAULT_PTY)
		return PTY_MAP[pty] ?? { emoji: '🌫️', label: '알 수 없음' };

	return SKY_MAP[sky] ?? { emoji: '🌫️', label: '알 수 없음' };
};

export const formatFcstTime = (fcstDate: string, fcstTime: string): string => {
	const year = fcstDate.slice(0, 4);
	const month = fcstDate.slice(4, 6);
	const day = fcstDate.slice(6, 8);
	const hour = fcstTime.slice(0, 2);
	const minute = fcstTime.slice(2, 4);
	return `${year}.${month}.${day} ${hour}:${minute}`;
};
