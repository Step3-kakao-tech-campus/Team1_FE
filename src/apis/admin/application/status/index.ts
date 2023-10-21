import instance from 'apis/instance';
import { DailyWorkTimeData } from 'apis/schedule/getDailyWorkers';
import { AxiosResponse } from 'axios';

export const getApplyStatus = (params: { startWeekDate: string }): Promise<AxiosResponse<GetApplyStatusResponse>> => {
  return instance.get(`/schedule/remain/week`, { params });
};

interface GetApplyStatusResponse {
  applyStatus: DailyWorkTimeData[][];
}
