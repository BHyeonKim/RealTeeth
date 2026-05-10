import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import Router from '@/app/Router';

import './app/styles/index.css';
import { NavermapsProvider } from 'react-naver-maps';
import { QueryProvider } from './app/providers/QueryProvider';

// biome-ignore lint/style/noNonNullAssertion: root element always exists
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID}>
				<RouterProvider router={Router} />
			</NavermapsProvider>
		</QueryProvider>
	</StrictMode>,
);
