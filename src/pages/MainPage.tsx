import PageContainer from 'components/atoms/PageContainer';
import LoginOrSignup from 'components/molecules/LoginOrSignup';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

interface Component {}

const MainPage = ({}: Component): JSX.Element => {
  const islogin = useSelector((state: RootState) => state.login).islogin;

  return (
    <PageContainer isHeader={islogin} isBottonBar={false}>
      <div className="w-full bg-slate-400 h-80 mb-8">임시 온보딩 컴포넌트</div>
      {islogin ? '로그인됨' : <LoginOrSignup />}
    </PageContainer>
  );
};

export default MainPage;
