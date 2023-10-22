import instance from 'apis/instance';
import { TimeData } from 'apis/types';
import { AxiosResponse } from 'axios';

export const getTimeTemplate = async (params: GetParams): Promise<GetReturn> => {
  const response: AxiosResponse<GetResponse> = await instance.get(`/schedule/worktime`, { params });
  const template = response.data.template.map((time: TimeData) => ({
    ...time,
    startTime: time.startTime.slice(0, -3),
    endTime: time.endTime.slice(0, -3),
  }));
  return { template };
};

interface GetParams {
  startWeekDate: string;
}

interface GetResponse {
  template: TimeData[];
}

interface GetReturn {
  template: TimeData[];
}

export const postOpenApplication = (params: PostParams) => {
  const newTemplate = params.timeTemplate.map((timeObject) => ({
    ...timeObject,
    startTime: `${timeObject.startTime}:00`,
    endTime: `${timeObject.endTime}:00`,
  }));

  const requestBody: PostRequest = {
    weekStartDate: params.startWeekDate,
    amount: params.weeklyAmount,
    template: newTemplate,
  };

  return instance.post(`/schedule/worktime`, requestBody);
};

interface PostParams {
  weeklyAmount: number[][];
  timeTemplate: TimeData[];
  startWeekDate: string;
}

interface PostRequest {
  weekStartDate: string;
  template: TimeData[];
  amount: number[][];
}
