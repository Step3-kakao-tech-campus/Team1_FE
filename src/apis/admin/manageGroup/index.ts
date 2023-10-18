import instance from 'apis/instance';

export const addNewGroup = <T>(marketInfo: T) => {
  return instance.post(`/group`, marketInfo);
};

// 초대링크 발급
export const getInviteKey = () => {
  return instance.get(`/group/invitation`);
};
