import instance from 'apis/instance';

const postLogin = async (kakaoCode: string) => {
  return await instance.post(`/auth/login`, {
    code: kakaoCode,
  });
};

export { postLogin };
