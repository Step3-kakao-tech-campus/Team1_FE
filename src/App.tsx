import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { myTheme } from 'styles/myTheme';

import { convertPath } from 'apis/convertURI';

import KakaoAuthPage from 'pages/KakaoAuthPage';
import SignupPage from 'pages/SignupPage';
import InvitedPage from 'pages/InvitedPage';
import AddGroupPage from 'pages/AddGroupPage';
import HomePrivate from 'auth/HomePrivate';
import LogoutOnlyPrivate from 'auth/LogoutOnlyPrivate';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
        <ErrorBoundary fallback={<p>에러... app.tsx</p>}>
          <Suspense fallback={<p>로딩... app.tsx</p>}>
            <Routes>
              <Route element={<HomePrivate />}>
                <Route path={convertPath('/')} />
              </Route>

              <Route element={<LogoutOnlyPrivate />}>
                <Route path={convertPath('/signup')} element={<SignupPage />} />
                <Route path={convertPath('/login/kakao')} element={<KakaoAuthPage />} />
              </Route>

              <Route path={convertPath('/invited/:invitationKey')} element={<InvitedPage />} />
              <Route path={convertPath('/addGroup')} element={<AddGroupPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
