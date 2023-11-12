import { TimeData } from '../../../src/apis/types';
// schedule/worktime
export const getTimeTemplate = {
  template: [
    {
      title: '오픈',
      startTime: '10:00:00',
      endTime: '12:00:00',
    },
    {
      title: '미들',
      startTime: '12:00:00',
      endTime: '16:00:00',
    },
    {
      title: '마감',
      startTime: '16:00:00',
      endTime: '22:00:00',
    },
  ],
};

interface GetReturn {
  template: TimeData[];
}
// /schedule/worktime
export const postOpenApplication = {};

interface PostRequest {
  weekStartDate: string;
  template: TimeData[];
  amount: number[][];
}
