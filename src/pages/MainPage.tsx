import MainContainer from 'components/atoms/MainContainer';
import PageContainer from 'components/atoms/PageContainer';
import SubmitButton from 'components/atoms/SubmitButton';
import HeaderNB from 'components/organisms/HeaderNB';
import LoginOrSignup from 'components/organisms/LoginOrSignup';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

interface Component {}

const MainPage = ({}: Component): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);

  return loginState.islogin ? (
    <HeaderNB />
  ) : (
    <PageContainer>
      <MainContainer>
        <div className="w-full bg-slate-400 h-80 mb-8">온보딩 컴포넌트</div>
        <LoginOrSignup />
      </MainContainer>
    </PageContainer>
  );
};

export default MainPage;
