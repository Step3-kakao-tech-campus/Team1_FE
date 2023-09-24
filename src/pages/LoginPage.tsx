import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = (): JSX.Element => {
  const loginPath = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <div>
      로그인하세요
      <Link to={loginPath}>
        <button>카카오톡으로 로그인하기</button>
      </Link>
      <Link to={loginPath}>
        <button>카카오톡으로 시작하기</button>
      </Link>
    </div>
  );
};

export default LoginPage;
