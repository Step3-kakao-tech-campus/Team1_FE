import React, { Suspense } from 'react';
import OnBoardingPage from 'pages/OnBoardingPage';
import AlbaMainIndex from './alba/AlbaMainIndex';
import AdminMainIndex from 'pages/admin/AdminMainIndex';
import Loader from 'components/Suspenses/Loader';
import { getLoginData } from 'utils/loginDatahandlers';

const HomeIndex = () => {
  const loginState = getLoginData();
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
