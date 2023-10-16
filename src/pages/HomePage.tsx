import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';
import AdminHomePage from 'pages/admin-MainPage/AdminHomePage';
import AdminNoGroupPage from 'pages/admin-MainPage/AdminNoGroupPage';
import OnBoardingPage from 'pages/OnBoardingPage';

const HomePage = () => {
  const loginState = useSelector((state: RootState) => state.login);
  const isLogin: boolean = loginState.islogin;
  const isAdmin: boolean = loginState.userData.isAdmin;
  const hasGroup: boolean = loginState.userData?.groupName.length > 0;

  return (
    <>
      {isLogin && isAdmin && hasGroup && (
        <Suspense fallback={<div>전체 페이지 로딩...</div>}>
          <AdminHomePage />
        </Suspense>
      )}
      {isLogin && !isAdmin && hasGroup && (
        <Suspense fallback={<div>전체 페이지 로딩...</div>}>
          <div>알바홈</div>
        </Suspense>
      )}

      {isLogin && isAdmin && !hasGroup && <AdminNoGroupPage />}
      {isLogin && !isAdmin && !hasGroup && <div>AlbaNoGroupPage 매니저에게 초대받으세요</div>}

      {!isLogin && <OnBoardingPage />}
    </>
  );
};

export default HomePage;
