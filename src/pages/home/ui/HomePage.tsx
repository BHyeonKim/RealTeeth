import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation } from 'react-router';

import { FavoriteToggleButton } from '@/features/favorite';
import Search from '@/features/search/ui/Search';
import { WeatherMap } from '@/widgets/map';

const HomePage = () => {
	const location = useLocation();

	return (
		<div className="relative h-full w-full">
			<FavoriteToggleButton className="fixed top-4 left-4 z-10" />
			<Search className="fixed top-18 left-4 z-10" />
			<WeatherMap />
			<AnimatePresence>
				<Outlet key={location.pathname} />
			</AnimatePresence>
		</div>
	);
};

export default HomePage;
