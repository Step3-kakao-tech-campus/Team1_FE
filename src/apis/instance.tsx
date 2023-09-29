import axios from 'axios';
import store from 'states/store';
import { apiURL } from 'apis/convertURI';

const instance = axios.create({
  baseURL: apiURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestDefault = instance.interceptors.request.use(
  (config) => {
    console.log(config);

    const loginState = store.getState().login;
    if (loginState.islogin) {
      config.headers.Authorization = loginState.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const responseInterceptors = instance.interceptors.response.use(
  (response) => {
    console.log(response);
    // 다른 데이터는 body에 담는데 토큰은 header에 담으므로 로그인 요청일땐 따로 지정
    if (response.config.url?.includes('/auth')) {
      return response.headers.authorization;
    }
    return response.data.response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
