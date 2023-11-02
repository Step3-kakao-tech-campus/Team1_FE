import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { myTheme } from 'styles/myTheme';

import { convertPath } from 'apis/convertURI';
import { Provider } from 'jotai';

import LogoutOnlyPrivate from 'privateRoutes/LogoutOnlyPrivate';
import UserTypePrivate from 'privateRoutes/UserTypePrivate';

import HomeIndex from 'pages/HomeIndex';
import SignupPage from 'pages/SignupPage';
import InvitedPage from 'pages/alba/InvitedPage';
import AddGroupPage from 'pages/admin/AddGroupPage';
import ApplicationOpenPage from 'pages/admin/ApplicationOpenPage';
import ApplicationClosePage from 'pages/admin/ApplicationClosePage';
import ApplyPage from 'pages/alba/ApplyPage';
import SelectWeekPage from 'pages/SelectWeekPage';
import ErrorFallback from 'error/ErrorFallback';
import ViewPortContainer from 'components/@commons/ViewPortContainer';
import { QueryCache, QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import useErrorHandler from 'error/useErrorHandler';
import KakaoAuthPage from 'pages/KakaoAuthPage';

function App(): JSX.Element {
  const { reset } = useQueryErrorResetBoundary();
  const { apiErrorHandler } = useErrorHandler();
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
        retry: 0,
        onError: (err) => apiErrorHandler(err || { name: 'unknownError' }),
      },
      mutations: {
        onError: (err) => apiErrorHandler(err || { name: 'unknownError' }),
      },
    },
  });

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={myTheme}>
          <ViewPortContainer>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <Routes>
                <Route path={convertPath('/')} element={<HomeIndex />} />
                <Route path={convertPath('/invited/:invitationKey')} element={<InvitedPage />} />

                <Route element={<LogoutOnlyPrivate />}>
                  <Route path={convertPath('/signup')} element={<SignupPage />} />
                  <Route path={convertPath('/login/kakao')} element={<KakaoAuthPage />} />
                </Route>

                <Route element={<UserTypePrivate when="admin" />}>
                  <Route path={convertPath('/addGroup')} element={<AddGroupPage />} />
                  <Route path={convertPath('/newSchedule')} element={<SelectWeekPage isAdmin />} />
                  <Route path={convertPath('/newSchedule/open')} element={<ApplicationOpenPage />} />
                  <Route path={convertPath('/newSchedule/close')} element={<ApplicationClosePage />} />
                </Route>

                <Route element={<UserTypePrivate when="alba" />}>
                  <Route path={convertPath('/apply')} element={<SelectWeekPage isAdmin={false} />} />
                  <Route path={convertPath('/apply/selectTimes')} element={<ApplyPage />} />
                </Route>
              </Routes>
            </ErrorBoundary>
          </ViewPortContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
