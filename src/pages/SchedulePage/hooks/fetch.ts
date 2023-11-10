import { useQuery } from '@tanstack/react-query';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';
import { getMonthly } from 'apis/schedule/getMonthly';
import { useAtomValue, useSetAtom } from 'jotai';
import { SelectedMonthData, memberAtom, workTimeAtom } from 'pages/SchedulePage/states';
import { useEffect } from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';

export const useGetMonthly = ({ year, month }: SelectedMonthData) => {
  const nowMember = useAtomValue(memberAtom);
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;

  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, nowMember.userId],
    () =>
      getMonthly({
        year: year,
        month: month,
        userId: nowMember.userId,
        isAdmin: isAdmin,
      }),
    {
      suspense: true,
      enabled: nowMember.isSelected === true,
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
      getDailyWorkers({ selectedDate: selectedDate }).catch((err) => {
        if (err.response?.code === -11001) {
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
