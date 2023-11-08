import { TimeData } from './../../../src/apis/types';
// schedule/worktime
export const getTimeTemplate = {};

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
