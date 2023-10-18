import instance from 'apis/instance';
import { dateToString } from 'utils/dateToString';

interface WeekProgressRequest {
  year: number;
  month: number;
}

export interface WeekProgressObject {
  weekStatus: WeekStatus;
  dates: string[];
}

export type WeekStatus = 'allocatable' | 'inProgress' | 'closed' | '';

export const getWeekProgress = async (info: WeekProgressRequest) => {
  const { year, month } = { ...info };

  let firstMonday = 1;

  // 1. 첫번째 월요일 찾기
  const dayOf1st = new Date(year, month, 1).getDay();
  if (dayOf1st > 1) {
    firstMonday = 2 - dayOf1st;
  } else if (dayOf1st === 0) {
    firstMonday = -5;
  }

  // 2. 2차원 빈 달력
  const table: WeekProgressObject[] = [];
  for (let i = 0; i < 6; i++) {
    const weekly = [];
    const startWeekDate = i * 7 + firstMonday;

    if (i === 5 && new Date(year, month, startWeekDate).getDate() !== startWeekDate) {
      break;
    }

    for (let j = startWeekDate; j < startWeekDate + 7; j++) {
      weekly.push(dateToString(new Date(year, month, j)));
    }

    const params = {
      startWeekDate: dateToString(new Date(year, month, startWeekDate)),
    };
    const response = await instance.get(`/schedule/status`, { params });
    const weekStatus = await response.data.weekStatus;

    const weekObject = {
      weekStatus: weekStatus,
      dates: weekly,
    };

    table.push(weekObject);
  }

  return { table };
};
