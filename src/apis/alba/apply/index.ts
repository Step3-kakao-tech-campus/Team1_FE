import instance from 'apis/instance';
import { SelectedTimeData, TimeData } from 'apis/types';
import { AxiosResponse } from 'axios';

export const getApplyForm = async (params: { startWeekDate: string }) => {
  const response: AxiosResponse<GetApplyFormResponse> = await instance.get(`/schedule/application`, { params });

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

interface GetApplyFormResponse {
  template: {
    title: string;
    startTime: string;
    endTime: string;
    workTimeId: number;
  }[];
  selected: SelectedTimeData[][];
}

export const putApply = (body: PutApplyRequest) => {
  return instance.put(`/schedule/application`, body);
};

interface PutApplyRequest {
  weekStartDate: string;
  apply: SelectedTimeData[][];
}
