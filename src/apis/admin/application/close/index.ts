import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';
import { AxiosResponse } from 'axios';

export const postRecommends = (body: PostRequest) => {
  return instance.post(`/schedule/fix`, body);
};

interface PostRequest {
  selection: number;
}

export const getRecommends = (params: GetParams): Promise<AxiosResponse<GetResponse>> => {
  return instance.get(`/schedule/recommend`, { params });
};

interface GetParams {
  startWeekDate: string;
}

interface GetResponse {
  recommends: TimeWorkerListData[][][];
}
