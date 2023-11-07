import { QueryCache, QueryClient } from '@tanstack/query-core';
import { defaultErrorHandler } from 'error/defaultErrorHandler';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      defaultErrorHandler(error || { name: 'unknownError' });
      setTimeout(() => {
        queryClient.removeQueries(query.queryKey);
      }, 1000);
    },
  }),
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (err) => defaultErrorHandler(err || { name: 'unknownError' }),
    },
  },
});
