import instance from 'apis/instance';
import { DailyWorkTimeData, TotalWorkedTimeData } from 'apis/types';
import { timeColors } from 'utils/colors';
import { dateToString } from 'utils/dateToString';
import { loginDatahandlers } from 'utils/loginDatahandlers';

export const getMonthly = async ({ year, month, userId }: Param): Promise<Return> => {
  const strMonth = String(month + 1).padStart(2, '0');
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;

  let params = {};

  if (isAdmin) {
    params = {
      month: `${year}-${strMonth}`,
      userId: userId,
    };
  } else {
    params = {
      month: `${year}-${strMonth}`,
    };
  }

  const response: Response = await instance.get(`/schedule/fix/month`, { params });
  const calendar = to2Dimension({ year, month, monthly: response.schedule });
  return { table: calendar.table, totalTime: response.work_summary, badgeColor: calendar.badgeColor };
};

interface Return {
  table: DailyWorkTimeData[][];
  totalTime: TotalWorkedTimeData;
  badgeColor: { [index: string]: string };
}

interface Response {
  schedule: DailyWorkTimeData[];
  work_summary: TotalWorkedTimeData;
}

interface Param {
  year: number;
  month: number;
  userId?: number;
}

export const to2Dimension = ({
  year,
  month,
  monthly,
}: {
  year: number;
  month: number;
  monthly: DailyWorkTimeData[];
}) => {
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
  const allWorkTimes: Set<string> = new Set();
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

      if (objectDaily === undefined || objectDaily.workTime === null) continue;
      for (let title of objectDaily.workTime) {
        allWorkTimes.add(title);
      }
    }
    table.push(weekly);
  }

  const badgeColor: { [index: string]: string } = {};
  const allWorkTimesArr = Array.from(allWorkTimes).sort();
  allWorkTimesArr.map((e, i) => {
    badgeColor[e] = timeColors(i);
  });
  return { table, badgeColor };
};
