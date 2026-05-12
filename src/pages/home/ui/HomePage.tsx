import { Outlet } from 'react-router';

import { Favorite, FavoriteToggleButton } from '@/features/favorite';
import Search from '@/features/search/ui/Search';
import { WeatherMap } from '@/widgets/map';

const HomePage = () => {
	return (
		<div className="relative h-full w-full">
			<FavoriteToggleButton className="fixed top-4 left-4 z-10" />
			<Search className="fixed top-18 left-4 z-10" />
			<WeatherMap />
			<Favorite />
			<Outlet />
		</div>
	);
};

export default HomePage;
