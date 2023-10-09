import instance from 'apis/instance';

const postsignup = (name: string, admin: boolean) => {
  return instance.post(`/auth/join`, {
    userName: name,
    isAdmin: admin,
  });
};

export { postsignup };
