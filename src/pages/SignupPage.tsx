import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Addinfo from 'components/signup/Addinfo';
import SelectType from 'components/signup/SelectType';

import useForm from 'hooks/useForm';
import useLogin from 'hooks/useLogin';
import signupValidator from 'utils/signupValidator';

const signupPage = (): JSX.Element => {
  // 1. 폼 입력 상태 관리
  interface StateType {
    [index: string]: string | boolean | null;
    isAdmin: boolean | null;
    userName: string;
    agreement: boolean;
  }

  const initalInfo: StateType = {
    isAdmin: null,
    userName: '',
    agreement: false,
  };

  const { obj: userInfo, formHandler, toggleHandler, selectOneHandler } = useForm(initalInfo);

  // 2. 로그인 요청 보내기
  const { signup } = useLogin();

  const signupBtnHandler = () => {
    signup(userInfo);
  };

  return (
    <PageContainer gap="36px" withoutHeader withoutBottonBar>
      <FlexContainer $direction="row" $wFull={true}>
        <p className="align-middle text-xl">가입하기</p>
      </FlexContainer>

      <SelectType selectOneHandler={selectOneHandler} userInfo={userInfo} />

      {userInfo.isAdmin !== null && (
        <FlexContainer $wFull $padding="0 40px">
          <Addinfo
            formHandler={formHandler}
            toggleHandler={toggleHandler}
            signupBtnHandler={signupBtnHandler}
            userInfo={userInfo}
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
