import type { Coordinates, GridCoord } from '../types/coordinates.type';

const GRID_WIDTH = 5.0;
const PI = Math.PI;
const DEG_TO_RAD = PI / 180;

const MAP = {
	Re: 6371.00877, // 지도반경
	grid: GRID_WIDTH, // 격자간격 (km)
	slat1: 30.0, // 표준위도 1
	slat2: 60.0, // 표준위도 2
	olon: 126.0, // 기준점 경도
	olat: 38.0, // 기준점 위도
	xo: 210 / GRID_WIDTH, // 기준점 X좌표
	yo: 675 / GRID_WIDTH, // 기준점 Y좌표
} as const;

export const transCoordinatesToGrid = (coordinates: Coordinates): GridCoord => {
	const re = MAP.Re / MAP.grid;
	const slat1 = MAP.slat1 * DEG_TO_RAD;
	const slat2 = MAP.slat2 * DEG_TO_RAD;
	const olon = MAP.olon * DEG_TO_RAD;
	const olat = MAP.olat * DEG_TO_RAD;

	let sn =
		Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
	sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

	let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
	sf = (sf ** sn * Math.cos(slat1)) / sn;

	let ro = Math.tan(PI * 0.25 + olat * 0.5);
	ro = (re * sf) / ro ** sn;

	let ra = Math.tan(PI * 0.25 + coordinates.lat * DEG_TO_RAD * 0.5);
	ra = (re * sf) / ra ** sn;

	let theta = coordinates.lng * DEG_TO_RAD - olon;
	if (theta > PI) theta -= 2.0 * PI;
	if (theta < -PI) theta += 2.0 * PI;
	theta *= sn;

	return {
		nx: Math.floor(ra * Math.sin(theta) + MAP.xo + 0.5),
		ny: Math.floor(ro - ra * Math.cos(theta) + MAP.yo + 0.5),
	};
};
