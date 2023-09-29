import instance from 'apis/instance';

// 헤더: 토큰, 바디: 키
export const postGroupJoin = (key: string) => {
  return instance.post(`/group/invitation`, {
    invitationKey: key,
  });
};

// 그룹 프사, 그룹 이름
export const getGroupInvitation = () => {
  return instance.get(`/group`);
};
