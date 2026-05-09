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
/** 강수확률 (%) */
type POP = 'POP';
/** 1시간 강수량 (범주, 1mm) */
type PCP = 'PCP';
/** 1시간 신적설 (범주, 1cm) */
type SNO = 'SNO';
/** 하늘상태 (코드값: 1=맑음, 3=구름많음, 4=흐림) */
type SKY = 'SKY';
/** 1시간 기온 (°C) */
type TMP = 'TMP';
/** 일 최저기온 (°C) */
type TMN = 'TMN';
/** 일 최고기온 (°C) */
type TMX = 'TMX';
/** 파고 (M) */
type WAV = 'WAV';

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

/** 단기예보 조회 카테고리 */
export type VilageFcstCategory =
	| POP
	| PTY
	| PCP
	| REH
	| SNO
	| SKY
	| TMP
	| TMN
	| TMX
	| UUU
	| VVV
	| WAV
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

/** 단기예보 조회 아이템 */
export type VilageFcstItem = {
	baseDate: string;
	baseTime: string;
	category: VilageFcstCategory;
	fcstDate: string;
	fcstTime: string;
	fcstValue: string;
	nx: number;
	ny: number;
};

/** 단기예보 조회 아이템 맵 (키: `${fcstDate}_${fcstTime}`) */
export type VilageFcstItemMap = Record<
	string,
	Record<VilageFcstCategory, VilageFcstItem>
>;

/** 단기예보 조회 응답 */
export type VilageFcstResponse = {
	response: {
		header: {
			resultCode: string;
			resultMsg: string;
		};
		body: {
			dataType: string;
			items: {
				item: VilageFcstItem[];
			};
			pageNo: number;
			numOfRows: number;
			totalCount: number;
		};
	};
};
