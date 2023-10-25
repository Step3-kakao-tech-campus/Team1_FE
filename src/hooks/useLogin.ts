import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { postsignup, postLogin, SignupRequest } from 'apis/auth';
import React from 'react';
import useErrorHandler from 'error/useErrorHandler';

interface UserDataType {
  isAdmin: boolean;
}

const defaultLoginState = { isLogin: false, token: '', isAdmin: false };

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
        // 로그인, 토큰 저장
        saveLoginData(response.headers.authorization, response.data);
      })
      .catch((error) => {
        apiErrorHandler(error);
      });
  };

  const login = (code: string) => {
    postLogin({ code: code })
      .then((response) => {
        // 회원일 경우 로그인
        saveLoginData(response.headers.authorization, response.data);
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

  // const [loginState, setLoginState] = useAtom(loginAtom);

  const saveLoginData = (token: string, userData: UserDataType) => {
    const redirect: string = sessionStorage.getItem('beforeLoginURL') || '/';
    sessionStorage.removeItem('beforeLoginURL');

    const loginData = {
      token: token,
      isLogin: true,
      isAdmin: userData.isAdmin,
    };

    // setLoginState(loginData);
    sessionStorage.setItem('login', JSON.stringify(loginData));
    navigate(convertPath(redirect));
  };

  const logout = () => {
    sessionStorage.removeItem('login');
    // setLoginState(defaultLoginState);
    navigate(convertPath('/'));
  };

  const getLoginState = () => {
    const stringData = sessionStorage.getItem('login');
    if (stringData === null) return defaultLoginState;

    return JSON.parse(stringData);
  };

  return { logout, signup, login, loginBtnHandler, getLoginState };
};

export default useLogin;
