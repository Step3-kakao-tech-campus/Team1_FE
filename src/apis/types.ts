// TimeWorkersData
export interface TimeWorkerListData {
  title: string;
  startTime: string;
  endTime: string;
  workerList: WorkerData[];
}

export interface WorkerData {
  memberId: number;
  name: string;
}

export interface TimeData {
  title: string;
  startTime: string;
  endTime: string;
}

export interface DailyWorkTimeData {
  date: string;
  workTime: string[] | null;
}

export interface TotalWorkedTimeData {
  weekly: number;
  monthly: number;
}

export interface SelectedTimeData {
  workTimeId: number;
  isChecked: boolean;
}

export interface WeekStatusData {
  weekStatus: WeekStatusTypes;
  dates: string[];
}

export type WeekStatusTypes = 'allocatable' | 'inProgress' | 'closed' | '';
