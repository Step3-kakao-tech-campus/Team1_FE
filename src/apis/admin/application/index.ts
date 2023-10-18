import instance from 'apis/instance';

interface Time {
  title: string;
  startTime: string;
  endTime: string;
}

export const postRecommends = (params: { selection: number }) => {
  return instance.post(`/schedule/recommend`, { selection: params.selection });
};

export const getRecommends = (params: { startWeekDate: string }) => {
  return instance.get(`/schedule/recommend`, { params });
};

export const postOpenApplication = (params: {
  weeklyAmount: number[][];
  timeTemplate: Time[];
  startWeekDate: string;
}) => {
  const timeTemplate = params.timeTemplate.map((timeObject) => ({
    ...timeObject,
    startTime: `${timeObject.startTime}:00`,
    endTime: `${timeObject.endTime}:00`,
  }));
  const weeklyData = params.weeklyAmount.map((dailyArr) =>
    dailyArr.map((amount, i) => ({ ...timeTemplate[i], amount: amount })),
  );

  return instance.post(`/schedule/worktime`, { startWeekDate: params.startWeekDate, weeklyAmount: weeklyData });
};

export const getTimeTemplate = async (params: { startWeekDate: string }) => {
  const response = await instance.get(`/schedule/worktime`, { params });
  const template = response.data.template.map((time: Time) => ({
    ...time,
    startTime: time.startTime.slice(0, -3),
    endTime: time.endTime.slice(0, -3),
  }));
  return { template };
};

export const getApplyStatus = (params: { startWeekDate: string }) => {
  return instance.get(`/schedule/remian/week`, { params });
};
