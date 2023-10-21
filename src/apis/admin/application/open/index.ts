import instance from 'apis/instance';

export interface TimeData {
  title: string;
  startTime: string;
  endTime: string;
}

export const getTimeTemplate = async (params: { startWeekDate: string }): Promise<{ template: TimeData[] }> => {
  const response = await instance.get(`/schedule/worktime`, { params });
  const template = response.data.template.map((time: TimeData) => ({
    ...time,
    startTime: time.startTime.slice(0, -3),
    endTime: time.endTime.slice(0, -3),
  }));
  return { template };
};

export const postOpenApplication = (params: {
  weeklyAmount: number[][];
  timeTemplate: TimeData[];
  startWeekDate: string;
}) => {
  const newTemplate = params.timeTemplate.map((timeObject) => ({
    ...timeObject,
    startTime: `${timeObject.startTime}:00`,
    endTime: `${timeObject.endTime}:00`,
  }));

  const requestBody: PostOpenRequest = {
    weekStartDate: params.startWeekDate,
    amount: params.weeklyAmount,
    template: newTemplate,
  };

  return instance.post(`/schedule/worktime`, requestBody);
};

interface PostOpenRequest {
  weekStartDate: string;
  template: TimeData[];
  amount: number[][];
}
