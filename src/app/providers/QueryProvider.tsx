import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import WhetherInvalidator from '@/entities/whether/ui/WhetherInvalidator';

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
	key: 'realteeth-whether',
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			<WhetherInvalidator />
			{children}
		</PersistQueryClientProvider>
	);
};
