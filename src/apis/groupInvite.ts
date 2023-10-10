import instance from 'apis/instance';

// 그룹초대 승인
export const postGroupJoin = (body: { invitationKey: string }) => {
  return instance.post(`/group/invitation`, body);
};

// 매장명 확인, (추가: 이미 소속된 그룹인지 여부)
export const getGroupInfo = (params: { invitationKey: string }) => {
  return instance.get(`/group/invitation/information`, { params });
};

// 초대링크 발급
export const getInviteKey = () => {
  return instance.get(`/group/invitation`);
};
