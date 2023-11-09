import { QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { convertPath } from 'apis/convertURI';
import ViewPortContainer from 'components/@commons/ViewPortContainer';
import ErrorFallback from 'error/ErrorFallback';
import { Provider } from 'jotai';
import HomeIndex from 'pages/HomeIndex';
import SelectWeekPage from 'pages/SelectWeekPage';
import SignupPage from 'pages/SignupPage';
import AddGroupPage from 'pages/admin/AddGroupPage';
import ApplicationClosePage from 'pages/admin/ApplicationClosePage';
import ApplicationOpenPage from 'pages/admin/ApplicationOpenPage';
import ApplyPage from 'pages/alba/ApplyPage';
import InvitedPage from 'pages/alba/InvitedPage';
import KakaoAuthPage from 'pages/auth/KakaoAuthPage';
import LogoutOnlyPrivate from 'privateRoutes/LogoutOnlyPrivate';
import UserTypePrivate from 'privateRoutes/UserTypePrivate';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { myTheme } from 'styles/myTheme';
import { queryClient } from 'utils/queryClient';

function App(): JSX.Element {
  const { reset } = useQueryErrorResetBoundary();

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
