import instance from 'apis/instance';

const postSignin = (name: string, admin: boolean) => {
  return instance.post(`/auth/join`, {
    userName: name,
    isAdmin: admin,
  });
};

export { postSignin };
