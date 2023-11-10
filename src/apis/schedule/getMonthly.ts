import instance from 'apis/instance';
import { DailyWorkTimeData, TotalWorkedTimeData } from 'apis/types';
import { timeColors } from 'utils/colors';
import { dateToString } from 'utils/dateToString';

export const getMonthly = async (info: Info): Promise<Return> => {
  const { year, month } = { ...info };
  const strMonth = String(month + 1).padStart(2, '0');

  let params = {};

  if (info.isAdmin) {
    params = {
      month: `${year}-${strMonth}`,
      userId: info.userId,
    };
  } else {
    params = {
      month: `${year}-${strMonth}`,
    };
  }

  const response: Response = await instance.get(`/schedule/fix/month`, { params });

  return to2Dimension(info, response);
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

interface Info {
  year: number;
  month: number;
  isAdmin: boolean;
  userId: number;
}

const to2Dimension = (info: Info, response: Response): Return => {
  const { year, month } = { ...info };

  const totalTime = response.work_summary;
  const monthly = response.schedule;

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
  return { table, totalTime, badgeColor };
};
