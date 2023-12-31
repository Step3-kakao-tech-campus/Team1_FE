export interface TimeData {
  title: string;
  startTime: string;
  endTime: string;
}

export interface TimeWithIdData extends TimeData {
  workTimeId: number;
}

export interface TimeWorkerListData extends TimeData {
  workerList: UserData[];
}

export interface SelectedTimeData extends TimeWithIdData {
  isChecked: boolean;
}

export interface ApplyData {
  workTimeId: number;
  isChecked: boolean;
}

export interface UserData {
  userId: number;
  name: string;
  isAdmin: boolean;
}

export interface DailyWorkTimeData {
  date: string;
  workTime: string[] | null;
}

export interface TotalWorkedTimeData {
  weekly: number;
  monthly: number;
}

export interface WeekStatusData {
  weekStatus: WeekStatusTypes;
  dates: string[];
}

export interface AddNeweGroupForm {
  marketName: string;
  marketNumber: string;
  mainAddress: string;
  detailAddress: string;
}

export type WeekStatusTypes = 'allocatable' | 'inProgress' | 'closed' | '';

export interface ErrorData {
  name?: string;
  response?: {
    status: number;
    data?: {
      error: {
        errorCode: number;
      };
    };
  };
}

export interface ErrorFallbackProps {
  error: ErrorData;
  resetErrorBoundary: () => void;
}
