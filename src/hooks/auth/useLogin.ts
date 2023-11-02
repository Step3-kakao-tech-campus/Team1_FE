import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { SignupRequest } from 'apis/auth';
import React from 'react';
import { removeLoginData } from 'utils/loginDatahandlers';
import { useLoginFetch } from './fetch';

const useLogin = (redirectPage?: string) => {
  const navigate = useNavigate();

  /* ------------ 로그인 요청 부분 ------------ */

  const loginBtnHandler = (): void => {
    sessionStorage.setItem('beforeLoginURL', redirectPage || '/');
    const redirectURI = new URL(window.location.href).origin + '/login/kakao';
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
  };

  const { signupMutate, loginMutate } = useLoginFetch();
  const signup = (requestBody: SignupRequest): void => {
    signupMutate(requestBody);
  };

  const login = (code: string) => {
    loginMutate(code);
  };

  const logout = () => {
    removeLoginData();
    navigate(convertPath('/'));
  };

  return { logout, signup, login, loginBtnHandler };
};

export default useLogin;
