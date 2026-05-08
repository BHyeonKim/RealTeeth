import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import Router from '@/App.tsx';

// biome-ignore lint/style/noNonNullAssertion: root element always exists
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={Router} />
	</StrictMode>,
);
