import PageContainer from 'components/@commons/PageContainer';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

import NoGroupSection from 'components/admin-home/NoGroupSection';
import AdminHomeSection from 'components/admin-home/AdminHomeSection';
import OnBoardingSection from 'components/OnBoardingSection';

const MainPage = (): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);
  const isLogin: boolean = loginState.islogin;
  const isGroup: boolean = loginState.userData?.groupId !== 0;

  return (
    <PageContainer withoutHeader={!isLogin} withoutBottonBar={!isGroup}>
      {isLogin ? isGroup ? <AdminHomeSection /> : <NoGroupSection /> : <OnBoardingSection />}
    </PageContainer>
  );
};

export default MainPage;
