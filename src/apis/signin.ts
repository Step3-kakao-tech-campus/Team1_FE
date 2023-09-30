import instance from 'apis/instance';

const postSignin = async (name: string, admin: boolean) => {
  return await instance.post(`/auth/join`, {
    userName: name,
    isAdmin: admin,
  });
};

export { postSignin };
