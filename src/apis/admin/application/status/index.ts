import instance from 'apis/instance';
import { TimeData, TimeWithIdData, TimeWorkerListData, UserData } from 'apis/types';
import { AxiosResponse } from 'axios';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getApplyStatus = async (params: Params): Promise<Return> => {
  const response: AxiosResponse<Response> = await instance.get(`/schedule/remain/week`, { params });
  const weeklyArray = response.data.applyStatus;

  const templates: { [index: number]: TimeData } = {};
  for (let timeObj of response.data.template) {
    templates[timeObj.workTimeId] = {
      title: timeObj.title,
      startTime: strTimeProcessor(timeObj.startTime),
      endTime: strTimeProcessor(timeObj.endTime),
    };
  }

  const applyStatus = weeklyArray.map((dailyArray) => {
    return dailyArray.map((workersObj) => {
      return { ...templates[workersObj.workTimeId], workerList: workersObj.workerList };
    });
  });

  return { applyStatus };
};

interface Params {
  startWeekDate: string;
}

interface Return {
  applyStatus: TimeWorkerListData[][];
}

interface Response {
  template: TimeWithIdData[];
  applyStatus: {
    workTimeId: number;
    workerList: UserData[];
  }[][];
}
