import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';

export const postRecommends = (body: PostRequest) => {
  return instance.post(`/schedule/fix`, body);
};

interface PostRequest {
  weekStartDate: string;
  selection: number;
}

export const getRecommends = (params: GetParams): Promise<GetResponse> => {
  return instance.get(`/schedule/recommend`, { params });
};

interface GetParams {
  startWeekDate: string;
}

interface GetResponse {
  recommends: TimeWorkerListData[][][];
}
