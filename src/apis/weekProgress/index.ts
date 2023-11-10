import instance from 'apis/instance';
import { WeekStatusData, WeekStatusTypes } from 'apis/types';
import { dateToString } from 'utils/dateToString';

export const getWeekProgress = async ({ year, month }: { year: number; month: number }): Promise<Return> => {
  const today = new Date().getTime();

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
    // 해당 주 날짜 리스트 생성
    const weekly = [];
    const startWeekDate = i * 7 + firstMonday;

    // 6주차가 다음달일 때
    if (i === 5 && new Date(year, month, startWeekDate).getDate() !== startWeekDate) {
      break;
    }

    for (let j = startWeekDate; j < startWeekDate + 7; j++) {
      weekly.push(dateToString(new Date(year, month, j)));
    }

    // 주 상태 객체 생성 (기본값 : 모집마감)
    const weekObject: WeekStatusData = {
      weekStatus: 'closed',
      dates: weekly,
    };

    // 해당 주가 오늘 이후일 때 : 요청 보내기
    if (today < new Date(year, month, startWeekDate).getTime()) {
      const params: Params = {
        startWeekDate: dateToString(new Date(year, month, startWeekDate)),
      };

      const response: Response = await instance.get(`/schedule/status`, { params });
      weekObject.weekStatus = response.weekStatus;
    }

    table.push(weekObject);
  }

  return { table };
};

interface Params {
  startWeekDate: string;
}

interface Return {
  table: WeekStatusData[];
}

interface Response {
  weekStatus: WeekStatusTypes;
}
