import instance from 'apis/instance';
import { AxiosResponse } from 'axios';

// 그룹초대 승인
export const postGroupJoin = (body: PostRequest) => {
  return instance.post(`/group/invitation`, body);
};

interface PostRequest {
  invitationKey: string;
}

// 매장명 확인, (추가: 이미 소속된 그룹인지 여부)
export const getGroupInfo = (params: GetParams): Promise<AxiosResponse<GetResponse>> => {
  return instance.get(`/group/invitation/information`, { params });
};

interface GetParams {
  invitationKey: string;
}

interface GetResponse {
  marketName: string;
}
