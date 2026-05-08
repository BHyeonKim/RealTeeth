import { useEffect, useState } from 'react';
import type { Coordinates } from '@/shared/types/coordinates.type';

/**
 * 브라우저 Geolocation API로 사용자의 현재 위치를 실시간 감지하는 훅.
 * `watchPosition`을 사용하므로 위치가 변경될 때마다 자동으로 갱신된다.
 *
 * @param onError - 위치 감지 실패 시 호출되는 콜백 (선택)
 * @param option - `navigator.geolocation.watchPosition`에 전달할 옵션 (선택)
 * @returns `location` — 현재 위치 좌표 (권한 미허용 시 null),
 *          `isLocationPermissionDenied` — 위치 권한 거부 여부
 *
 * @example
 * const { location, isLocationPermissionDenied } = useLocation(
 *   (error) => console.error(error),
 *   { enableHighAccuracy: true },
 * )
 *
 * if (isLocationPermissionDenied) return <PermissionGuide />
 * if (!location) return <Loading />
 * return <Map center={location} />
 */
const useLocation = (
	onError?: PositionErrorCallback,
	option?: PositionOptions,
) => {
	const [location, setLocation] = useState<Coordinates | null>(null);
	const [isLocationPermissionDenied, setIsLocationPermissionDenied] =
		useState<boolean>(false);

	useEffect(() => {
		if (!('geolocation' in navigator)) return;

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setIsLocationPermissionDenied(false);
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			(error) => {
				if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
					setIsLocationPermissionDenied(true);
				}
				onError?.(error);
			},
			option,
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, [onError, option]);

	return { location, isLocationPermissionDenied };
};

export default useLocation;
