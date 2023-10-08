import React from 'react';
import LoginOrSignup from 'components/@commons/LoginOrSignup';
import FlexContainer from 'components/@commons/FlexContainer';

const OnBoardingSection = (): JSX.Element => {
  return (
    <FlexContainer $wFull>
      <div className="w-full bg-slate-400 h-80 mb-8">임시 온보딩 컴포넌트</div>
      <LoginOrSignup />
    </FlexContainer>
  );
};

export default OnBoardingSection;
