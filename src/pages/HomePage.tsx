import React, { Suspense } from 'react';
import AdminHomePage from 'pages/admin-MainPage/AdminHomePage';
import OnBoardingPage from 'pages/OnBoardingPage';
import useLogin from 'hooks/useLogin';

const HomePage = () => {
  const loginState = useLogin().getLoginState();
  const isLogin: boolean = loginState.isLogin;
  const isAdmin: boolean = loginState.isAdmin;

  return (
    <>
      {!isLogin && <OnBoardingPage />}

      {isLogin && isAdmin && (
        <Suspense fallback={<div>전체 페이지 로딩...</div>}>
          <AdminHomePage />
        </Suspense>
      )}

      {isLogin && !isAdmin && (
        <Suspense fallback={<div>전체 페이지 로딩...</div>}>
          <div>알바홈</div>
        </Suspense>
      )}
    </>
  );
};

export default HomePage;
