import { createBrowserRouter } from 'react-router';

import { AppLayout } from '@/app/layouts/app.layout';
import { HomePage } from '@/pages/home';

const Router = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		children: [
			{
				index: true,
				Component: HomePage,
			},
		],
	},
]);

export default Router;
