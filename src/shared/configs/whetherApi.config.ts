import axios from 'axios';

const SERVICE_KEY = import.meta.env
	.VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_API_KEY;

if (!SERVICE_KEY) {
	throw new Error('환경 변수가 설정되지 않았습니다.');
}

export const whetherApiClient = axios.create({
	params: {
		authKey: SERVICE_KEY,
		dataType: 'JSON',
	},
});
