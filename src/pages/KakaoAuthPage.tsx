import { postLogin } from 'apis/login';
import useLogin from 'hooks/useLogin';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoAuthPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { saveLogin } = useLogin();
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code === null) return;
    postLogin(code)
      .then((response) => {
        // 회원일 경우 로그인
        saveLogin(response);
      })
      .catch((error) => {
        // 비회원일 경우
        if (error.response && error.response.status === 404) {
          // 회원가입 처리를 하러 간다.
          navigate('/signin');
        }
      });
  }, [code]);

  return <p> 로그인 처리중 ... </p>;
};

export default KakaoAuthPage;
