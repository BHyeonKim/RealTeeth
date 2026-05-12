import { useSyncExternalStore } from 'react';

type ScreenSize = 'mobile' | 'desktop';

const MOBILE_QUERY = '(max-width: 440px)';

const getScreenSize = (): ScreenSize => {
	return window.matchMedia(MOBILE_QUERY).matches ? 'mobile' : 'desktop';
};

const subscribe = (callback: () => void) => {
	const mediaQueryList = window.matchMedia(MOBILE_QUERY);

	mediaQueryList.addEventListener('change', callback);

	return () => {
		mediaQueryList.removeEventListener('change', callback);
	};
};

const useDeviceSize = () => {
	return useSyncExternalStore(subscribe, getScreenSize);
};

export default useDeviceSize;
