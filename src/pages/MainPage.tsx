import PageContainer from 'components/@commons/PageContainer';
import LoginOrSignup from 'components/@commons/LoginOrSignup';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

const MainPage = (): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);

  return (
    <PageContainer withoutHeader={!loginState.islogin} withoutBottonBar={loginState.userData?.groupId === 0}>
      {loginState.islogin ? (
        '로그인됨'
      ) : (
        <>
          <div className="w-full bg-slate-400 h-80 mb-8">임시 온보딩 컴포넌트</div>
          <LoginOrSignup />
        </>
      )}
    </PageContainer>
  );
};

export default MainPage;
