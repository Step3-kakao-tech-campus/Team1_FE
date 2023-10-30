import instance from 'apis/instance';
import { AddNeweGroupForm } from 'apis/types';
import { AxiosResponse } from 'axios';

export const postAddNewGroup = (body: AddNeweGroupForm) => {
  return instance.post(`/group`, body);
};

// 초대링크 발급
export const getInviteKey = (): Promise<AxiosResponse<GetResponse>> => {
  return instance.get(`/group/invitation`);
};

interface GetResponse {
  invitationKey: string;
}
