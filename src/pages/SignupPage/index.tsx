import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import AddinfoSection from 'pages/SignupPage/AddinfoSection';
import SelectTypeSection from 'pages/SignupPage/SelectTypeSection';

import useForm from 'hooks/useForm';
import useLogin from 'hooks/useLogin';
import Logo from 'assets/schedule_albbaim.png';
import { useLocation } from 'react-router-dom';
import { nameValidator, signupValidator } from 'utils/validators';

interface SignUpFormData {
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
  } = useForm<SignUpFormData>({
    isAdmin: null,
    userName: '',
    agreement: false,
  });

  // 2. 로그인 요청 보내기
  const { signup } = useLogin();
  const code = useLocation().state.code;
  const signupBtnHandler = () => {
    signup({
      isAdmin: userInfo.isAdmin as boolean,
      userName: userInfo.userName,
      code: code,
    });
  };

  // 코드 없이 접속했을 때 에러처리

  return (
    <PageContainer withoutHeader withoutBottonBar>
      {userInfo.isAdmin === null && (
        <FlexContainer $align="center" $padding="0 18%">
          <img src={Logo} width="100%" />
        </FlexContainer>
      )}

      <SelectTypeSection<SignUpFormData> selectOneHandler={selectOneHandler<boolean>} userInfo={userInfo} />

      {userInfo.isAdmin !== null && (
        <FlexContainer $wFull $gap="36px" $padding="0 40px">
          <AddinfoSection
            formHandler={formHandler}
            toggleHandler={toggleHandler}
            isNameError={userInfo.userName.length > 0 && !nameValidator(userInfo.userName)}
          />

          <SubmitButton onClick={signupBtnHandler} disabled={!signupValidator(userInfo)}>
            가입 완료
          </SubmitButton>
        </FlexContainer>
      )}
    </PageContainer>
  );
};

export default signupPage;
