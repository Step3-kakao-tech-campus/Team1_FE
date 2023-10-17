import instance from 'apis/instance';

const postLogin = (body: { code: string }) => {
  return instance.post(`/auth/login`, body);
};

export { postLogin };
