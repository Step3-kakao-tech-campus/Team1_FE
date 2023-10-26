import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import App from 'App';

import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      setTimeout(() => {
        queryClient.removeQueries(query.queryKey);
      }, 1000);
    },
  }),
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retryOnMount: true,
      retry: 1,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
