import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/schedule/getMonthly';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { dateAtom, memberAtom, monthAtom, workTimeAtom } from 'pages/SchedulePage/states';
import { getLoginData } from 'utils/loginDatahandlers';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';

export const useGetMonthly = () => {
  const nowMember = useAtomValue(memberAtom);
  const { year, month } = useAtomValue(monthAtom);
  const setWorkTime = useSetAtom(workTimeAtom);
  const isAdmin = getLoginData().isAdmin;

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
      onSuccess: (scheduleData) => {
        setWorkTime({ ...scheduleData?.totalTime });
      },
    },
  );

  return { scheduleData };
};

export const useGetDailyWorkers = () => {
  const selectedDate = useAtomValue(dateAtom);

  const { data: scheduleResponse } = useQuery(
    ['getDailyWorkers', 'newSchedule', selectedDate.date],
    () =>
      getDailyWorkers({ selectedDate: selectedDate.date }).catch((err) => {
        if (err.response?.data?.code === -11001) {
          return null;
        } else {
          throw err;
        }
      }),
    {
      suspense: true,
      enabled: selectedDate.date !== '' && selectedDate.isFixed,
    },
  );
  return { scheduleResponse };
};
