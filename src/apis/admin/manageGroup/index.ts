import instance from 'apis/instance';
import { AxiosResponse } from 'axios';

export interface NewGroupRequest {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}

export const postAddNewGroup = (marketInfo: NewGroupRequest) => {
  return instance.post(`/group`, marketInfo);
};

// 초대링크 발급
export const getInviteKey = (): Promise<AxiosResponse<GetInviteKeyResponse>> => {
  return instance.get(`/group/invitation`);
};

interface GetInviteKeyResponse {
  invitationKey: string;
}
