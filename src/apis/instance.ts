import axios from 'axios';
import { apiURL } from 'apis/convertURI';
import useLogin from 'hooks/useLogin';

const instance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestDefault = instance.interceptors.request.use(
  (config) => {
    const loginState = useLogin().getLoginState();
    if (loginState.islogin) {
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
