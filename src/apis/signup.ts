import instance from 'apis/instance';

const postsignup = <T>(userInfo: T) => {
  return instance.post(`/auth/join`, userInfo);
};

export { postsignup };
