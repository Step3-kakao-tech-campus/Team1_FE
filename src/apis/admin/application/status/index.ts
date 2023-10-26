import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';
import { AxiosResponse } from 'axios';

export const getApplyStatus = (params: Params): Promise<AxiosResponse<Response>> => {
  return instance.get(`/schedule/remain/week`, { params });
};

interface Params {
  startWeekDate: string;
}

interface Response {
  applyStatus: TimeWorkerListData[][];
}
