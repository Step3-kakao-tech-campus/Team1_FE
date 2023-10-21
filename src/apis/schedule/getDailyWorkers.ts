import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';
import { AxiosResponse } from 'axios';

export const getDailyWorkers = (params: Params): Promise<AxiosResponse<Response>> => {
  return instance.get(`/schedule/fix/day`, { params });
};

interface Params {
  selectedDate: string;
}

interface Response {
  schedule: TimeWorkerListData[];
}
