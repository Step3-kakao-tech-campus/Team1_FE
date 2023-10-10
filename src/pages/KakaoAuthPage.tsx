import useLogin from 'hooks/useLogin';
import React, { useEffect } from 'react';

const KakaoAuthPage = (): JSX.Element => {
  const { login } = useLogin();
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code === null) return;
    login(code);
  }, [code]);

  return <p> 로그인 처리중 ... </p>;
};

export default KakaoAuthPage;
