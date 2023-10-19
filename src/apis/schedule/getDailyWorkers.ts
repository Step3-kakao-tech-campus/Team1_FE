import instance from 'apis/instance';

export const getDailyWorkers = (params: GetDailyWorkersRequest): Promise<GetDailyWorkerResponse> => {
  return instance.get(`/schedule/fix/day`, { params });
};

export interface DailyWorkTimeData {
  title: string;
  startTime: string;
  endTime: string;
  workerList: WorkerData[];
}

export interface WorkerData {
  memberId: number;
  name: string;
}

interface GetDailyWorkersRequest {
  date: string;
}

interface GetDailyWorkerResponse {
  data: { schedule: DailyWorkTimeData[] };
}
