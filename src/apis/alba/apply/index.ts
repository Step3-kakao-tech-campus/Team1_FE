import instance from 'apis/instance';
import { SelectedTimeData, TimeData, TimeWithIdData } from 'apis/types';
import { AxiosResponse } from 'axios';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getApplyForm = async (params: GetParams): Promise<GetReturn> => {
  const response: AxiosResponse<GetResponse> = await instance.get(`/schedule/application`, { params });

  const templates: { [index: number]: TimeData } = {};
  for (let timeObj of response.data.template) {
    templates[timeObj.workTimeId] = {
      title: timeObj.title,
      startTime: strTimeProcessor(timeObj.startTime),
      endTime: strTimeProcessor(timeObj.endTime),
    };
  }

  const selected = response.data.selected.map((dailyArray) => {
    return dailyArray.map((workersObj) => {
      return { ...templates[workersObj.workTimeId], isChecked: workersObj.isChecked };
    });
  });

  return { selected, templates };
};

interface GetParams {
  startWeekDate: string;
}

interface GetResponse {
  template: TimeWithIdData[];
  selected: {
    workTimeId: number;
    isChecked: boolean;
  }[][];
}

interface GetReturn {
  selected: SelectedTimeData[][];
  templates: { [index: number]: TimeData };
}

export const putApply = (body: PutRequest) => {
  return instance.put(`/schedule/application`, body);
};

interface PutRequest {
  weekStartDate: string;
  apply: SelectedTimeData[][];
}
