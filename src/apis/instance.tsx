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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
