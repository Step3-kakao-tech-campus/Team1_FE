import instance from 'apis/instance';

// 헤더: 토큰, 바디: 키
export const postGroupJoin = async (key: string) => {
  return await instance.post(`/group/invitation`, {
    invitationKey: key,
  });
};

// 그룹 프사, 그룹 이름
export const getGroupInvitation = async (key: string) => {
  return await instance.post(`/group`, {
    invitationKey: key,
  });
};
