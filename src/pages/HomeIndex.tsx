import React, { Suspense } from 'react';
import OnBoardingPage from 'pages/OnBoardingPage';
import useLogin from 'hooks/useLogin';
import AlbaMainIndex from './alba/AlbaMainIndex';
import AdminMainIndex from 'pages/admin/AdminMainIndex';
import Loader from 'components/Suspenses/Loader';

const HomeIndex = () => {
  const loginState = useLogin().getLoginState();
  const isLogin: boolean = loginState.isLogin;
  const isAdmin: boolean = loginState.isAdmin;

  return (
    <>
      {!isLogin && <OnBoardingPage />}

      {isLogin && isAdmin && (
        <Suspense fallback={<Loader />}>
          <AdminMainIndex />
        </Suspense>
      )}

      {isLogin && !isAdmin && (
        <Suspense fallback={<Loader />}>
          <AlbaMainIndex />
        </Suspense>
      )}
    </>
  );
};

export default HomeIndex;
