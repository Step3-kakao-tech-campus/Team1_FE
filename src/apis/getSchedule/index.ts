import instance from 'apis/instance';
import { dateToString } from 'utils/dateToString';

export const getDailyWorkers = (params: { date: string }) => {
  return instance.get(`/schedule/fix/day`, { params });
};

export const getMonthly = async (info: { year: number; month: number; memberId: number }) => {
  const { year, month } = { ...info };
  const params = {
    month: `${year}-${month + 1}`,
    memberId: info.memberId,
  };

  const response = await instance.get(`/schedule/fix/month`, { params });
  const totalTime = response.data.work_summary;
  const monthly = response.data.schedule;

  let firstMonday = 1;

  // 1. 첫번째 월요일 찾기
  const dayOf1st = new Date(year, month, 1).getDay();
  if (dayOf1st > 1) {
    firstMonday = 2 - dayOf1st;
  } else if (dayOf1st === 0) {
    firstMonday = -5;
  }

  // 2. 2차원 빈 달력
  const table = [];
  for (let i = 0; i < 6; i++) {
    const weekly = [];
    const startWeekDate = i * 7 + firstMonday;

    if (i === 5 && new Date(year, month, startWeekDate).getDate() !== startWeekDate) {
      break;
    }

    for (let j = startWeekDate; j < startWeekDate + 7; j++) {
      const dateString = dateToString(new Date(year, month, j));

      const objectDaily = monthly.find((e: { date: string }) => e.date === dateString);
      const emptyDaily = {
        date: dateString,
        workTime: null,
      };

      weekly.push(!!objectDaily ? objectDaily : emptyDaily);
    }
    table.push(weekly);
  }

  return { table, totalTime };
};
