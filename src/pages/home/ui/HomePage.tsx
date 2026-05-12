import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation } from 'react-router';

import { FavoriteToggleButton } from '@/features/favorite';
import Search from '@/features/search/ui/Search';
import useDeviceSize from '@/shared/hooks/useDeviceSize';
import { WeatherMap } from '@/widgets/map';

const HomePage = () => {
	const location = useLocation();
	const device = useDeviceSize();
	const isDesktop = device === 'desktop';

	return (
		<div className="relative h-full w-full">
			<div
				className={`fixed top-4 z-10 flex w-full max-w-95 flex-col gap-3 ${isDesktop ? 'left-4' : 'left-1/2 -translate-x-1/2'}`}
			>
				{isDesktop && <FavoriteToggleButton />}
				<Search />
			</div>
			<WeatherMap />
			<AnimatePresence>
				<Outlet key={location.pathname} />
			</AnimatePresence>
		</div>
	);
};

export default HomePage;
