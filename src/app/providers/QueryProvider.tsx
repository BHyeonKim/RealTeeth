import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WhetherInvalidator from '@/entities/whether/ui/WhetherInvalidator';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<WhetherInvalidator />
			{children}
		</QueryClientProvider>
	);
};
