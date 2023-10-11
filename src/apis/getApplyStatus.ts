import instance from 'apis/instance';

export const getApplyStatus = (params: { startWeekDate: string }) => {
  return instance.get(`/schedule/remian/week`, { params });
};
