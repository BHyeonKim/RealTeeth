import axios from 'axios';

const SERVER_URL = import.meta.env
	.VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_SERVER_URL;
const SERVICE_KEY = import.meta.env
	.VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_API_KEY;

if (!SERVER_URL || !SERVICE_KEY) {
	throw new Error('환경 변수가 설정되지 않았습니다.');
}

export const whetherApiClient = axios.create({
	baseURL: SERVER_URL,
	params: {
		authKey: SERVICE_KEY,
		dataType: 'JSON',
	},
});
