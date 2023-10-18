import instance from 'apis/instance';

export const getMyInfo = () => {
  return instance.get(`/group`);
};
