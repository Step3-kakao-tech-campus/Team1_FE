import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';

export const getDailyWorkers = (params: GetDailyWorkersRequest): Promise<GetDailyWorkerResponse> => {
  return instance.get(`/schedule/fix/day`, { params });
};

interface GetDailyWorkersRequest {
  date: string;
}

interface GetDailyWorkerResponse {
  data: { schedule: TimeWorkerListData[] };
}
