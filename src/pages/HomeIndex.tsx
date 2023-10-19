import React, { Suspense } from 'react';
import OnBoardingPage from 'pages/OnBoardingPage';
import useLogin from 'hooks/useLogin';
import AlbaMainIndex from './alba/AlbaMainIndex';
import AdminMainIndex from 'pages/admin/AdminMainIndex';

const HomeIndex = () => {
  const loginState = useLogin().getLoginState();
  const isLogin: boolean = loginState.isLogin;
  const isAdmin: boolean = loginState.isAdmin;

  return (
    <>
      {!isLogin && <OnBoardingPage />}

      {isLogin && isAdmin && (
        <Suspense fallback={<div>전체 페이지 로딩...</div>}>
          <AdminMainIndex />
        </Suspense>
      )}

      {isLogin && !isAdmin && (
        <Suspense fallback={<div>전체 페이지 로딩...</div>}>
          <AlbaMainIndex />
        </Suspense>
      )}
    </>
  );
};

export default HomeIndex;
