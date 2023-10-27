import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/schedule/getMonthly';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { dateAtom, memberAtom, monthAtom, workTimeAtom } from 'pages/SchedulePage/states';
import { getLoginData } from 'utils/loginDatahandlers';

const useSchedule = () => {
  const nowMember = useAtomValue(memberAtom);
  const { year, month } = { ...useAtomValue(monthAtom) };

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

  const [selectedDate, setSelectedDate] = useAtom(dateAtom);
  const dateOnClick = (isFixed: boolean, date: string) => {
    setSelectedDate({ date: date, isFixed: isFixed });
  };

  return { scheduleData, selectedDate, dateOnClick };
};

export default useSchedule;
