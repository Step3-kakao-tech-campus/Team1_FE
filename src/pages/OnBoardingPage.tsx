import React from 'react';
import LoginOrSignup from 'components/LoginSignUpButton/LoginOrSignup';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from '../components/@commons/PageContainer';

const OnBoardingPage = (): JSX.Element => {
  return (
    <PageContainer withoutBottonBar withoutHeader>
      <FlexContainer $wFull>
        <div>임시 온보딩 컴포넌트</div>
        <LoginOrSignup />
      </FlexContainer>
    </PageContainer>
  );
};

export default OnBoardingPage;
