import instance from 'apis/instance';

const postsignup = async (name: string, admin: boolean) => {
  return await instance.post(`/auth/join`, {
    userName: name,
    isAdmin: admin,
  });
};

export { postsignup };
