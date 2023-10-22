import instance from 'apis/instance';
import { SelectedTimeData, TimeData } from 'apis/types';

export const getApplyForm = async (params: GetParams): Promise<GetReturn> => {
  const response = await instance.get(`/schedule/application`, { params });

  const selected = response.data.selected;
  const arrTemplate = response.data.template;

  const templates: { [index: number]: TimeData } = {};

  for (let timeData of arrTemplate) {
    templates[timeData.workTimeId] = {
      title: timeData.title,
      startTime: timeData.startTime.slice(0, -3),
      endTime: timeData.endTime.slice(0, -3),
    };
  }

  return { selected, templates };
};

interface GetParams {
  startWeekDate: string;
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
