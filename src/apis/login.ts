import instance from 'apis/instance';

const postLogin = (kakaoCode: string) => {
  return instance.post(`/login`, {
    code: kakaoCode,
  });
};

export { postLogin };
