import React from 'react';
import LoginOrSignup from 'components/@commons-feature/LoginOrSignup';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from '../components/@commons/PageContainer';

const OnBoardingPage = (): JSX.Element => {
  return (
    <PageContainer withoutBottonBar withoutHeader>
      <FlexContainer $wFull>
        <div className="w-full bg-slate-400 h-80 mb-8">임시 온보딩 컴포넌트</div>
        <LoginOrSignup />
      </FlexContainer>
    </PageContainer>
  );
};

export default OnBoardingPage;
