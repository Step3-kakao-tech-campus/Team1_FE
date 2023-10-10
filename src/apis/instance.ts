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
    // ----------------------------------- mockServer 테스트 용 dummyToken ---------------------------------------------
    if (apiURL.includes('pstmn.io')) {
      response.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.njMZIzJGvFZh0w4vPwJ_ayCQUUKrp2-jkRrc0U8PwpA';
    }
    // ----------------------------------------------------------------------------------------------------------------
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
