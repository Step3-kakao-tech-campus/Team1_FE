import Loader from 'components/Suspenses/Loader';
import OnBoardingPage from 'pages/OnBoardingPage';
import AdminMainIndex from 'pages/admin/AdminMainIndex';
import { Suspense } from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';
import AlbaMainIndex from './alba/AlbaMainIndex';

const HomeIndex = () => {
  const loginState = loginDatahandlers.getLoginData();
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
