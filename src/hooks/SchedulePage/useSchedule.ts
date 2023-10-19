import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/schedule/getMonthly';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import useLogin from 'hooks/useLogin';
import { dateAtom, monthAtom, workTimeAtom } from 'pages/SchedulePage/states';

const useSchedule = (selectedId: number | null) => {
  const [selectedDate, setSelectedDate] = useAtom(dateAtom);
  const [nowMonth] = useAtom(monthAtom);

  const { year, month } = { ...nowMonth };
  const isAdmin = useLogin().getLoginState().isAdmin;
  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, selectedId],
    () => getMonthly({ year: year, month: month, memberId: selectedId, isAdmin: isAdmin }),
    {
      suspense: true,
      enabled: selectedId !== 0,
    },
  );

  const [, setWorkTime] = useAtom(workTimeAtom);

  useEffect(() => {
    if (!scheduleData) return;
    setWorkTime((prev) => ({ ...scheduleData?.totalTime }));
  }, [scheduleData]);

  const dateOnClick = (isFixed: boolean, date: string) => {
    const newObj = { date: date, isFixed: isFixed };
    setSelectedDate((prev) => newObj);
  };

  return { scheduleData, selectedDate, dateOnClick };
};

export default useSchedule;
