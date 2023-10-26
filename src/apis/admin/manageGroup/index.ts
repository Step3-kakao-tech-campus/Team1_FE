import instance from 'apis/instance';
import { AxiosResponse } from 'axios';

export const postAddNewGroup = (body: postRequest) => {
  return instance.post(`/group`, body);
};

export interface postRequest {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}

// 초대링크 발급
export const getInviteKey = (): Promise<AxiosResponse<GetResponse>> => {
  return instance.get(`/group/invitation`);
};

interface GetResponse {
  invitationKey: string;
}
