import instance from 'apis/instance';

// 헤더: 토큰, 바디: 키
export const getMonthly = async (month: number, year: number) => {
  return await instance.post(`/scheduler/home`, {
    month: month,
    year: year,
  });
};
