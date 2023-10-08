import instance from 'apis/instance';
import { dateToString } from 'utils/dateToString';

export const getDailyWorkers = async (year: number, month: number, date: number) => {
  const params = {
    startWeekDate: `${year}-${month + 1}-${date}`,
  };
  return await instance.get(`/schedule/fix/day`, { params });
};

export const getMonthly = async (year: number, month: number, memberId: number) => {
  const params = {
    startWeekDate: `${year}-${month + 1}`,
    memberId: memberId,
  };
  const response = await instance.get(`/schedule/fix/month/`, { params });
  const worktime = response.data.work_summary;
  const monthly = response.data.schedule;

  let firstMonday = 1;

  // 1. 첫번째 월요일 찾기
  const dayOf1st = new Date(year, month, 1).getDay();
  console.log(new Date(year, month, 1).toDateString());
  if (dayOf1st > 1) {
    firstMonday = 1 - dayOf1st;
  } else if (dayOf1st === 0) {
    firstMonday = -5;
  }

  // 2. 2차원으로 만들기
  const table = [];
  for (let i = 0; i < 35; i = i + 7) {
    if (i < monthly.length) {
      // 확정 난 주
      const weekly = monthly.slice(i, i + 7);
      table.push(weekly);
    } else {
      // 확정 안난 주
      const weekly = [];
      for (let j = i + firstMonday; j < i + firstMonday + 7; j++) {
        const emptyDaily = {
          date: dateToString(new Date(year, month, j)),
          workTime: null,
        };
        weekly.push(emptyDaily);
      }
      table.push(weekly);
    }
  }

  return await { table, worktime };
};
