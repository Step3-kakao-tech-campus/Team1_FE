import instance from 'apis/instance';

// 그룹초대 승인
export const postGroupJoin = async (key: string) => {
  return await instance.post(`/group/invitation`, {
    invitationKey: key,
  });
};

// 매장명 확인, (추가: 이미 소속된 그룹인지 여부)
export const getGroupInfo = async (inviteKey: string) => {
  const params = {
    inviteKey: inviteKey,
  };
  return await instance.get(`/group/invitation/information`, { params });
};

// 초대링크 발급
export const getInvitationKey = async () => {
  return await instance.get(`/group/invitation`);
};
