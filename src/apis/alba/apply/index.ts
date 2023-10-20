import instance from 'apis/instance';

export const getApplyForm = (params: { startWeekDate: string }) => {
  return instance.get(`/application`, { params });
};

interface GetResponseBody {
  template: [];
}

export const putApply = (body: PutRequestBody) => {
  return instance.put(`/application`, body);
};

interface PutRequestBody {
  weekStartDate: string;
  apply: SelectSchedule[][];
}

interface SelectSchedule {
  workTimeId: number;
  isChecked: boolean;
}
