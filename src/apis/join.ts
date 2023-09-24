import instance from 'apis/instance';

const postSignin = (username: string) => {
  return instance.post(`/auth/join`, {
    username: username,
  });
};

export { postSignin };
