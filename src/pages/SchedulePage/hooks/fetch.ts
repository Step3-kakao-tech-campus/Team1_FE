import { useQuery } from '@tanstack/react-query';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';
import { getMonthly } from 'apis/schedule/getMonthly';
import { ErrorData } from 'apis/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { SelectedMonthData, memberAtom, workTimeAtom } from 'pages/SchedulePage/states';
import { useEffect } from 'react';

export const useGetMonthly = ({ year, month }: SelectedMonthData) => {
  const nowMember = useAtomValue(memberAtom);

  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, nowMember.userId],
    () =>
      getMonthly({
        year: year,
        month: month,
        userId: nowMember.userId,
      }),
    {
      suspense: true,
    },
  );

  const setWorkTime = useSetAtom(workTimeAtom);
  useEffect(() => {
    if (scheduleData === undefined) return;
    setWorkTime({ ...scheduleData?.totalTime });
  }, [scheduleData]);

  return { scheduleData };
};

export const useGetDailyWorkers = (selectedDate: string, enabled?: boolean) => {
  const { data: scheduleRes } = useQuery(
    ['getDailyWorkers', 'newSchedule', selectedDate],
    () =>
      getDailyWorkers({ selectedDate: selectedDate }).catch((err: ErrorData) => {
        if (err.response?.data?.error.errorCode === -11001) {
          return null;
        } else {
          throw err;
        }
      }),
    {
      suspense: true,
      enabled: enabled,
    },
  );
  const isNotFixed = scheduleRes === null;
  return { scheduleRes, isNotFixed };
};
