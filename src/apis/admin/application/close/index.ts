import instance from 'apis/instance';
import { DailyWorkTimeData } from 'apis/schedule/getDailyWorkers';
import { AxiosResponse } from 'axios';

export const postRecommends = (params: { selection: number }) => {
  return instance.post(`/schedule/fix`, { selection: params.selection });
};

export const getRecommends = (params: { startWeekDate: string }): Promise<AxiosResponse<GetRecommendsResponse>> => {
  return instance.get(`/schedule/recommend`, { params });
};

interface GetRecommendsResponse {
  recommends: DailyWorkTimeData[][][];
}
