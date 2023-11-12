import { apiURL } from 'apis/convertURI';
import axios from 'axios';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const instance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestDefault = instance.interceptors.request.use(
  (config) => {
    // 로그인 상태일 때 토큰 싣기
    const loginState = loginDatahandlers.getLoginData();
    if (loginState.isLogin) {
      config.headers.Authorization = loginState.token;
    }

    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const responseInterceptors = instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
