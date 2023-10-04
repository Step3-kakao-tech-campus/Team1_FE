import PageContainer from 'components/@commons/PageContainer';
import LoginOrSignup from 'components/@commons/LoginOrSignup';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

const MainPage = (): JSX.Element => {
  const islogin = useSelector((state: RootState) => state.login).islogin;

  return (
    <PageContainer withoutHeader={!islogin} withoutBottonBar>
      {islogin ? (
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
