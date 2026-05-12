import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export const AppLayout = () => {
	return (
		<div className="h-dvh w-full">
			<Outlet />
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						borderRadius: '12px',
						width: 'fit-content',
					},
				}}
				visibleToasts={1}
			/>
		</div>
	);
};
