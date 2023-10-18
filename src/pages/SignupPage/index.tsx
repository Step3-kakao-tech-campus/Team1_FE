import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import AddinfoSection from 'pages/SignupPage/AddinfoSection';
import SelectTypeSection from 'pages/SignupPage/SelectTypeSection';

import useForm from 'hooks/useForm';
import useLogin from 'hooks/useLogin';
import signupValidator from 'utils/signupValidator';
import Logo from 'assets/schedule_albbaim.png';
import { useLocation } from 'react-router-dom';

interface StateType {
  [index: string]: string | boolean | null;
  isAdmin: boolean | null;
  userName: string;
  agreement: boolean;
}

const signupPage = (): JSX.Element => {
  // 1. 입력폼 상태 관리
  const {
    obj: userInfo,
    formHandler,
    toggleHandler,
    selectOneHandler,
  } = useForm<StateType>({
    isAdmin: null,
    userName: '',
    agreement: false,
  });

  // 2. 로그인 요청 보내기
  const { signup } = useLogin();
  const code = useLocation().state.code;
  const signupBtnHandler = () => {
    if (userInfo.isAdmin === null) return;
    signup({ isAdmin: userInfo.isAdmin, userName: userInfo.userName, code: code });
  };

  // 코드 없이 접속했을 때 에러처리

  return (
    <PageContainer withoutHeader withoutBottonBar gap="36px">
      {userInfo.isAdmin === null && (
        <FlexContainer $align="center" $padding="0 18%">
          <img src={Logo} width="100%" />
        </FlexContainer>
      )}

      <SelectTypeSection<StateType> selectOneHandler={selectOneHandler<boolean>} userInfo={userInfo} />

      {userInfo.isAdmin !== null && (
        <FlexContainer $wFull>
          <AddinfoSection formHandler={formHandler} toggleHandler={toggleHandler} />
          <SubmitButton onClick={signupBtnHandler} disabled={!signupValidator<StateType>(userInfo)}>
            가입 완료
          </SubmitButton>
        </FlexContainer>
      )}
    </PageContainer>
  );
};

export default signupPage;
