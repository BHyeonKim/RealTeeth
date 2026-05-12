import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export const AppLayout = () => {
	return (
		<div className="h-dvh w-full font-pretendard">
			<Outlet />
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						borderRadius: '12px',
						width: 'fit-content',
						minWidth: 'max-content',
						transform: 'translateX(-50%)',
						left: '50%',
					},
				}}
				visibleToasts={1}
			/>
		</div>
	);
};
