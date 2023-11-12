import instance from 'apis/instance';
import { ApplyData, SelectedTimeData, TimeData, TimeWithIdData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getApplyForm = async (params: GetParams): Promise<GetReturn> => {
  const response: GetResponse = await instance.get(`/schedule/application`, { params });

  const templates: { [index: number]: TimeData } = {};
  for (let timeObj of response.template) {
    templates[timeObj.workTimeId] = {
      title: timeObj.title,
      startTime: strTimeProcessor(timeObj.startTime),
      endTime: strTimeProcessor(timeObj.endTime),
    };
  }

  const selected = response.selected.map((dailyArray) => {
    return dailyArray.map((workersObj) => {
      return { ...templates[workersObj.workTimeId], ...workersObj };
    });
  });

  return { selected };
};

interface GetParams {
  startWeekDate: string;
}

interface GetResponse {
  template: TimeWithIdData[];
  selected: ApplyData[][];
}

interface GetReturn {
  selected: SelectedTimeData[][];
}

export const putApply = (body: PutRequest) => {
  return instance.put(`/schedule/application`, body);
};

interface PutRequest {
  weekStartDate: string;
  apply: ApplyData[][];
}
