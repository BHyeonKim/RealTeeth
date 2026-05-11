import Search from '@/features/search/ui/Search';
import { WeatherMap } from '@/widgets/map';

const HomePage = () => {
	return (
		<div className="h-full w-full">
			<Search className="fixed top-4 left-4 z-10" />
			<WeatherMap />
		</div>
	);
};

export default HomePage;
