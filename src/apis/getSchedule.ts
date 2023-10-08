import instance from 'apis/instance';

export const getMonthly = async (year: number, month: number, memberId: number) => {
  const params = {
    startWeekDate: `${year}-${month + 1}`,
    memberId: memberId,
  };
  const response = await instance.get(`/schedule/fix/month/`, { params });
  const worktime = response.data.work_summary;
  const monthly = response.data.schedule;

  const table = [];

  // 7개씩 자르기
  for (let i = 0; i < monthly.length; i = i + 7) {
    const weekly = monthly.slice(i, i + 7);
    table.push(weekly);
  }

  return await { table, worktime };
};

export const getDailyWorkers = async (year: number, month: number, date: number) => {
  const params = {
    startWeekDate: `${year}-${month + 1}-${date}`,
  };
  return await instance.get(`/schedule/fix/day`, { params });
};
