import instance from 'apis/instance';
import { UserData } from 'apis/types';

export const getMyInfo = (): Promise<Response> => {
  return instance.get(`/group`);
};

interface Response {
  userName: string;
  groupName: string | null;
  members: UserData[];
}
