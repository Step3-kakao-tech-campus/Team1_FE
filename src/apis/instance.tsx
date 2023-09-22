import axios from 'axios';

let path: string = '';
let apiURL: string = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_PATH !== undefined) {
  path = process.env.REACT_APP_PATH;
  apiURL = path + '/api';
}

const instance = axios.create({
  baseURL: apiURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // 다른 데이터는 body에 담는데 토큰은 header에 담으므로 로그인 요청일땐 따로 지정
    if (response.config.url === '/login') {
      return response.headers.authorization;
    }
    return response.data.response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
