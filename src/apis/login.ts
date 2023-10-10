import instance from 'apis/instance';

const postLogin = (body: { kakaoCode: string }) => {
  return instance.post(`/auth/login`, body);
};

export { postLogin };
