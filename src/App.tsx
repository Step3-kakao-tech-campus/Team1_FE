import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import KakaoAuthPage from 'pages/KakaoAuthPage';
import LoginPage from 'pages/LoginPage';
import SigninPage from 'pages/SigninPage';
import InvitedPage from 'pages/InvitedPage';

import HeaderNB from 'components/organisms/HeaderNB';
import { convertPath } from 'apis/convertURI';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <HeaderNB />
      <ErrorBoundary fallback={<p>에러...</p>}>
        <Suspense fallback={<p>로딩...</p>}>
          <Routes>
            <Route path={convertPath('/')} element={<div>메인...</div>} />
            <Route path={convertPath('/login')} element={<LoginPage />} />
            <Route path={convertPath('/login/kakao')} element={<KakaoAuthPage />} />
            <Route path={convertPath('/signin')} element={<SigninPage />} />
            <Route path={convertPath('/invited/:invitationKey')} element={<InvitedPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
