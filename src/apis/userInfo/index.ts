import instance from 'apis/instance';
import { AxiosResponse } from 'axios';

export const getMyInfo = (): Promise<AxiosResponse<GetMyInfoResponse>> => {
  return instance.get(`/group`);
};

export interface MemberData {
  memberId: number;
  name: string;
}

interface GetMyInfoResponse {
  userName: string;
  groupName: string;
  members: MemberData[];
}
