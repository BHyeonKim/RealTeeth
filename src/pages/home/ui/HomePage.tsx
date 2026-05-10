import SearchBar from '@/features/search/ui/SearchBar';
import { WeatherMap } from '@/widgets/map';

const HomePage = () => {
	return (
		<div className="h-full w-full">
			<SearchBar className="fixed top-4 left-4 z-10" />
			<WeatherMap />
		</div>
	);
};

export default HomePage;
