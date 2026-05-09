/** 기온 (°C) */
type T1H = 'T1H';
/** 1시간 강수량 (mm) */
type RN1 = 'RN1';
/** 동서바람성분 (m/s) */
type UUU = 'UUU';
/** 남북바람성분 (m/s) */
type VVV = 'VVV';
/** 습도 (%) */
type REH = 'REH';
/** 강수형태 (코드값: 0=없음, 1=비, 2=비/눈, 3=눈, 5=빗방울, 6=빗방울눈날림, 7=눈날림) */
type PTY = 'PTY';
/** 풍향 (deg) */
type VEC = 'VEC';
/** 풍속 (m/s) */
type WSD = 'WSD';

/** 초단기실황 조회 카테고리 */
export type UltraSrtNcstCategory =
	| T1H
	| RN1
	| UUU
	| VVV
	| REH
	| PTY
	| VEC
	| WSD;

/** 초단기실황 조회 아이템 */
export type UltraSrtNcstItem = {
	baseDate: string;
	baseTime: string;
	category: UltraSrtNcstCategory;
	nx: number;
	ny: number;
	obsrValue: string;
};

/** 초단기실황 조회 아이템 맵 */
export type UltraSrtNcstItemMap = Record<
	UltraSrtNcstCategory,
	UltraSrtNcstItem
>;

/** 초단기실황 조회 응답 */
export type UltraSrtNcstResponse = {
	response: {
		header: {
			resultCode: string;
			resultMsg: string;
		};
		body: {
			dataType: string;
			items: {
				item: UltraSrtNcstItem[];
			};
			pageNo: number;
			numOfRows: number;
			totalCount: number;
		};
	};
};
