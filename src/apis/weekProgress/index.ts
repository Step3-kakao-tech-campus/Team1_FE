import instance from 'apis/instance';
import { WeekStatusData, WeekStatusTypes } from 'apis/types';
import { AxiosResponse } from 'axios';
import { dateToString } from 'utils/dateToString';

export const getWeekProgress = async (info: Info): Promise<Return> => {
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
  const table: WeekStatusData[] = [];
  for (let i = 0; i < 6; i++) {
    const weekly = [];
    const startWeekDate = i * 7 + firstMonday;

    if (i === 5 && new Date(year, month, startWeekDate).getDate() !== startWeekDate) {
      break;
    }

    for (let j = startWeekDate; j < startWeekDate + 7; j++) {
      weekly.push(dateToString(new Date(year, month, j)));
    }

    const params: Params = {
      startWeekDate: dateToString(new Date(year, month, startWeekDate)),
    };
    const response: AxiosResponse<Response> = await instance.get(`/schedule/status`, { params });
    const weekStatus = response.data.weekStatus;

    const weekObject = {
      weekStatus: weekStatus,
      dates: weekly,
    };

    table.push(weekObject);
  }

  return { table };
};

interface Info {
  year: number;
  month: number;
}

interface Params {
  startWeekDate: string;
}

interface Return {
  table: WeekStatusData[];
}

interface Response {
  weekStatus: WeekStatusTypes;
}
