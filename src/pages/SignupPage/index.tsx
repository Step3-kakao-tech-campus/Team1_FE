import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import AddinfoSection from 'pages/SignupPage/AddinfoSection';
import SelectTypeSection from 'pages/SignupPage/SelectTypeSection';

import useForm from 'hooks/useForm';

import { nameValidator } from 'utils/validators';
import useSignUpForm from 'hooks/SignUpPage/useSignUpForm';
import LogoPicture from 'components/@commons/LogoPicture';

const signupPage = (): JSX.Element => {
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

  const { signupBtnHandler } = useSignUpForm(userInfo);

  return (
    <PageContainer withoutHeader withoutBottonBar gap="36px">
      {userInfo.isAdmin === null && (
        <FlexContainer $align="center">
          <LogoPicture width="85%" />
        </FlexContainer>
      )}
      <FlexContainer $wFull $maxWidth="480px">
        <SelectTypeSection selectOneHandler={selectOneHandler<boolean>} isAdmin={userInfo.isAdmin} />

        {userInfo.isAdmin !== null && (
          <>
            <AddinfoSection
              formHandler={formHandler}
              toggleHandler={toggleHandler}
              isNameError={userInfo.userName.length > 0 && !nameValidator(userInfo.userName)}
            />

            <SubmitButton
              onClick={signupBtnHandler}
              disabled={userInfo.isAdmin === null || !nameValidator(userInfo.userName) || !userInfo.agreement}
            >
              가입 완료
            </SubmitButton>
          </>
        )}
      </FlexContainer>
    </PageContainer>
  );
};

export default signupPage;

interface SignUpFormData {
  [index: string]: string | boolean | null;
  isAdmin: boolean | null;
  userName: string;
  agreement: boolean;
}
