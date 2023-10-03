import SubmitButton from 'components/@commons/SubmitButton';
import React from 'react';

interface Props {
  redirectPage?: string;
}
const LoginOrSignup = ({ redirectPage = '/' }: Props): JSX.Element => {
  const loginPath = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <div className="w-full flex flex-col gap-4">
      <SubmitButton
        onClick={() => {
          localStorage.setItem('beforeLoginURL', redirectPage);
          location.href = loginPath;
        }}
      >
        카카오톡으로 로그인하기
      </SubmitButton>

      <SubmitButton
        onClick={() => {
          localStorage.setItem('beforeLoginURL', redirectPage);
          location.href = loginPath;
        }}
      >
        카카오톡으로 시작하기
      </SubmitButton>
    </div>
  );
};

export default LoginOrSignup;
