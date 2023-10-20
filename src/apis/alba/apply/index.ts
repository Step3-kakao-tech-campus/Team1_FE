import instance from 'apis/instance';
import { AxiosResponse } from 'axios';

export const getApplyForm = (params: { startWeekDate: string }): Promise<AxiosResponse<GetApplyFormResponse>> => {
  return instance.get(`/application`, { params });
};

interface GetApplyFormResponse {
  template: TimeTemplateData[];
  selected: SelectedSchedule[][];
}

export interface TimeTemplateData {
  title: string;
  startTime: string;
  endTime: string;
  workTimeId: number;
}

export interface SelectedSchedule {
  workTimeId: number;
  isChecked: boolean;
}

export const putApply = (body: PutApplyRequest) => {
  return instance.put(`/application`, body);
};

interface PutApplyRequest {
  weekStartDate: string;
  apply: SelectedSchedule[][];
}
