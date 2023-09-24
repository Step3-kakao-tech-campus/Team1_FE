import { postLogin } from 'apis/login';
import useLogin from 'hooks/useLogin';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoAuth = (): JSX.Element => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code === null) return;
    postLogin(code)
      .then((response) => {
        // 회원일 경우 로그인
        login(response);
      })
      .catch((error) => {
        // 비회원일 경우
        if (error.response && error.response.status === 400) {
          // 회원가입 처리를 하러 간다.
          navigate('/signin');
        }
      });
  }, [code]);

  return <p> 로그인 처리중 ... </p>;
};

export default KakaoAuth;
