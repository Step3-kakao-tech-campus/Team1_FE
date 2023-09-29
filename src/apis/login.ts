import instance from 'apis/instance';

const postLogin = (kakaoCode: string) => {
  return instance.post(`/auth/login`, {
    code: kakaoCode,
  });
};

export { postLogin };
