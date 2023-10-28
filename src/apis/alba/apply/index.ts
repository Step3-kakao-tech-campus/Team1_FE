import instance from 'apis/instance';
import { SelectedTimeData, TimeData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';

export const getApplyForm = async (params: GetParams): Promise<GetReturn> => {
  const response = await instance.get(`/schedule/application`, { params });
  const selected = response.data.selected;

  const templates: { [index: number]: TimeData } = {};
  for (let timeObj of response.data.template) {
    templates[timeObj.workTimeId] = {
      title: timeObj.title,
      startTime: strTimeProcessor(timeObj.startTime),
      endTime: strTimeProcessor(timeObj.endTime),
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
