import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { FavoriteBottomSheet, FavoriteToggleButton } from '@/features/favorite';
import Search from '@/features/search/ui/Search';
import useDeviceSize from '@/shared/hooks/useDeviceSize';
import { WeatherMap } from '@/widgets/map';

const HomePage = () => {
	const location = useLocation();
	const [isSearchActive, setIsSearchActive] = useState(false);
	const device = useDeviceSize();
	const isDesktop = device === 'desktop';
	const isMobileHome = device === 'mobile' && location.pathname === '/';

	return (
		<div className="relative h-full w-full">
			<div
				className={`fixed top-4 z-50 flex w-full max-w-95 flex-col gap-3 ${isDesktop ? 'left-4' : 'left-1/2 -translate-x-1/2'}`}
			>
				{isDesktop && <FavoriteToggleButton />}
				<Search onSearchActiveChange={setIsSearchActive} />
			</div>
			<WeatherMap />
			{isMobileHome && <FavoriteBottomSheet forcePeek={isSearchActive} />}
			<AnimatePresence>
				<Outlet key={location.pathname} />
			</AnimatePresence>
		</div>
	);
};

export default HomePage;
