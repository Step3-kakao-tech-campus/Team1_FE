import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { postsignup, postLogin, SignupRequest } from 'apis/auth';
import React from 'react';
import useErrorHandler from 'error/useErrorHandler';
import { removeLoginData, saveLoginData } from 'utils/loginDatahandlers';

const useLogin = (redirectPage?: string) => {
  const navigate = useNavigate();
  const { apiErrorHandler } = useErrorHandler();

  /* ------------ 로그인 요청 부분 ------------ */

  const loginBtnHandler = (): void => {
    sessionStorage.setItem('beforeLoginURL', redirectPage || '/');
    const redirectURI = new URL(window.location.href).origin + '/login/kakao';
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
  };

  const signup = (requestBody: SignupRequest): void => {
    postsignup(requestBody)
      .then((response) => {
        // 회원가입 성공 -> 로그인 처리
        afterLogin(response.headers.authorization, response.data);
      })
      .catch((error) => {
        apiErrorHandler(error);
      });
  };

  const login = (code: string) => {
    postLogin({ code: code })
      .then((response) => {
        // 회원일 경우 로그인
        afterLogin(response.headers.authorization, response.data);
      })
      .catch((error) => {
        // 비회원일 경우
        if (error.response && error.response.status === 404) {
          // 회원가입 처리를 하러 간다.
          navigate('/signup', { state: { code: code } });
        } else {
          apiErrorHandler(error);
        }
      });
  };

  /* ------------ 로그인 상태 관리 부분 ------------ */

  const afterLogin = (
    token: string,
    userData: {
      isAdmin: boolean;
    },
  ) => {
    saveLoginData(token, userData);
    navigate(convertPath(sessionStorage.getItem('beforeLoginURL') || '/'));
  };

  const logout = () => {
    removeLoginData();
    navigate(convertPath('/'));
  };

  return { logout, signup, login, loginBtnHandler };
};

export default useLogin;
