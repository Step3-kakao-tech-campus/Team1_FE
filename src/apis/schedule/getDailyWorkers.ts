import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getDailyWorkers = async (params: Params): Promise<Response> => {
  const response: Response = await instance.get(`/schedule/fix/day`, { params });
  const schedule = response.schedule.map((time: TimeWorkerListData) => ({
    ...time,
    startTime: strTimeProcessor(time.startTime),
    endTime: strTimeProcessor(time.endTime),
  }));

  return { schedule };
};

interface Params {
  selectedDate: string;
}

interface Response {
  schedule: TimeWorkerListData[];
}
