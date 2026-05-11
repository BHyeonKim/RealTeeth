import { createBrowserRouter } from 'react-router';
import { AppLayout } from '@/app/layouts/app.layout';
import { DetailPage } from '@/pages/detail';
import { HomePage } from '@/pages/home';

const Router = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		children: [
			{
				path: '',
				Component: HomePage,
				children: [
					{
						path: 'detail',
						Component: DetailPage,
					},
				],
			},
		],
	},
]);

export default Router;
