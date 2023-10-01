import instance from 'apis/instance';

// 헤더: 토큰, 바디: 키
export const postGroupJoin = async (key: string) => {
  return await instance.post(`/group/invitation`, {
    invitationKey: key,
  });
};

// 그룹 이름, (추가: 이미 소속된 그룹인지 여부)
export const getGroupInvitation = async (key: string) => {
  return await instance.post(`/group/invitation/information`, {
    invitationKey: key,
  });
};
