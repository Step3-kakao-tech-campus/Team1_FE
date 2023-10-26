import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { myTheme } from 'styles/myTheme';

import { convertPath } from 'apis/convertURI';
import { Provider } from 'jotai';

import LogoutOnlyPrivate from 'privateRoutes/LogoutOnlyPrivate';
import UserTypePrivate from 'privateRoutes/UserTypePrivate';

import HomeIndex from 'pages/HomeIndex';
import KakaoAuthPage from 'pages/KakaoAuthPage';
import SignupPage from 'pages/SignupPage';
import InvitedPage from 'pages/alba/InvitedPage';
import AddGroupPage from 'pages/admin/AddGroupPage';
import ApplicationOpenPage from 'pages/admin/ApplicationOpenPage';
import ApplicationClosePage from 'pages/admin/ApplicationClosePage';
import ApplyPage from 'pages/alba/ApplyPage';
import SelectWeekPage from 'pages/SelectWeekPage';
import ErrorFallback from 'error/ErrorFallback';
import ViewPortContainer from 'components/@commons/ViewPortContainer';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function App(): JSX.Element {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ThemeProvider theme={myTheme}>
      <Provider>
        <BrowserRouter>
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
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
