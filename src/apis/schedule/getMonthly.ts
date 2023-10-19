import instance from 'apis/instance';
import { dateToString } from 'utils/dateToString';

export interface DailyScheduleData {
  date: string;
  workTime: string[] | null;
}

export interface TotalWorkTimeData {
  weekly: number;
  monthly: number;
}

interface GetMonthlyInfo {
  year: number;
  month: number;
  isAdmin: boolean;
  memberId: number;
}

export const getMonthly = async (info: GetMonthlyInfo) => {
  const { year, month } = { ...info };

  let params = {};

  if (info.isAdmin) {
    params = {
      month: `${year}-${month + 1}`,
      memberId: info.memberId,
    };
  } else {
    params = {
      month: `${year}-${month + 1}`,
    };
  }

  const response = await instance.get(`/schedule/fix/month`, { params });

  return to2Dimension(info, response);
};

interface GetMonthlyResponse {
  data: {
    schedule: DailyScheduleData[];
    work_summary: TotalWorkTimeData;
  };
}

const to2Dimension = (info: GetMonthlyInfo, response: GetMonthlyResponse) => {
  const { year, month } = { ...info };

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
