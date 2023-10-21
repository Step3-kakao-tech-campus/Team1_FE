import instance from 'apis/instance';
import { UserData } from 'apis/types';
import { AxiosResponse } from 'axios';

export const getMyInfo = (): Promise<AxiosResponse<Response>> => {
  return instance.get(`/group`);
};

interface Response {
  userName: string;
  groupName: string;
  members: UserData[];
}
