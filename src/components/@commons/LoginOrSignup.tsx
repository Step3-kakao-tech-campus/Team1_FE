import SubmitButton from 'components/@commons/SubmitButton';
import useLogin from 'hooks/useLogin';
import React from 'react';

interface Props {
  redirectPage?: string;
}

const LoginOrSignup = ({ redirectPage = '/' }: Props): JSX.Element => {
  const { loginBtnHandler } = useLogin(redirectPage);
  return (
    <div className="w-full flex flex-col gap-4">
      <SubmitButton onClick={() => loginBtnHandler()}>카카오톡으로 로그인하기</SubmitButton>
      <SubmitButton onClick={() => loginBtnHandler()}>카카오톡으로 시작하기</SubmitButton>
    </div>
  );
};

export default LoginOrSignup;
