import React from 'react';

interface Props {
  redirectPage?: string;
}
const LoginOrSignup = ({ redirectPage = '/' }: Props): JSX.Element => {
  const loginPath = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <div>
      로그인하세요
      <a href={loginPath}>
        <button
          onClick={() => {
            localStorage.setItem('beforeLoginURL', redirectPage);
          }}
        >
          카카오톡으로 로그인하기
        </button>
      </a>
      <a href={loginPath}>
        <button
          onClick={() => {
            localStorage.setItem('beforeLoginURL', redirectPage);
          }}
        >
          카카오톡으로 시작하기
        </button>
      </a>
    </div>
  );
};

export default LoginOrSignup;
