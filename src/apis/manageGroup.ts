import instance from 'apis/instance';

export const addNewGroup = <T>(marketInfo: T) => {
  return instance.post(`/group`, marketInfo);
};

export const getGroupMemberList = () => {
  return instance.get(`/group`);
};
