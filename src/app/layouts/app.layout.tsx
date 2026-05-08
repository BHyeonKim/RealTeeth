import { Outlet } from 'react-router';

export const AppLayout = () => {
	return (
		<div className="h-dvh w-full">
			<Outlet />
		</div>
	);
};
