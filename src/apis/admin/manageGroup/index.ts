import instance from 'apis/instance';
import { AddNeweGroupForm } from 'apis/types';

export const postAddNewGroup = (body: AddNeweGroupForm) => {
  const marketNumber = body.marketNumber.slice(0, 2) + '-' + body.marketNumber.slice(2);
  return instance.post(`/group`, {
    ...body,
    marketNumber: marketNumber,
  });
};

// 초대링크 발급
export const getInviteKey = (): Promise<GetResponse> => {
  return instance.get(`/group/invitation`);
};

interface GetResponse {
  invitationKey: string;
}
