import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { myTheme } from 'styles/myTheme';

import { convertPath } from 'apis/convertURI';
import { Provider } from 'jotai';

import LogoutOnlyPrivate from 'auth/LogoutOnlyPrivate';
import AdminOnlyPrivate from 'auth/AdminOnlyPrivate';
import AdminHasGroupPrivate from 'auth/AdminHasGroupPrivate';

import HomePage from 'pages/HomePage';
import KakaoAuthPage from 'pages/KakaoAuthPage';
import SignupPage from 'pages/SignupPage/SignupPage';

import InvitedPage from 'pages/alba-InvitedPage/InvitedPage';

import AddGroupPage from 'pages/admin-AddGroupPage/AddGroupPage';
import SelectWeekPage from 'pages/admin-SelectWeekPage/SelectWeekPage';
import ApplicationOpenPage from 'pages/admin-ApplicationOpenPage/ApplicationOpenPage';
import ApplicationClosePage from 'pages/admin-ApplicationClosePage/ApplicationClosePage';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={myTheme}>
      <Provider>
        <BrowserRouter>
          <ErrorBoundary fallback={<p>에러... app.tsx</p>}>
            <Routes>
              <Route path={convertPath('/')} element={<HomePage />} />

              <Route element={<LogoutOnlyPrivate />}>
                <Route path={convertPath('/signup')} element={<SignupPage />} />
                <Route path={convertPath('/login/kakao')} element={<KakaoAuthPage />} />
              </Route>

              <Route element={<AdminOnlyPrivate />}>
                <Route path={convertPath('/addGroup')} element={<AddGroupPage />} />

                <Route element={<AdminHasGroupPrivate />}>
                  <Route path={convertPath('/newSchedule')} element={<SelectWeekPage />} />
                  <Route path={convertPath('/newSchedule/open')} element={<ApplicationOpenPage />} />
                  <Route path={convertPath('/newSchedule/close')} element={<ApplicationClosePage />} />
                </Route>
              </Route>

              <Route path={convertPath('/invited/:invitationKey')} element={<InvitedPage />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
