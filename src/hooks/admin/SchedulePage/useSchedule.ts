import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/getSchedule';
import { useAtom } from 'jotai';
import { dateAtom, memberAtom, monthAtom } from 'pages/admin/SchedulePage';
import React, { useEffect } from 'react';
import useLogin from 'hooks/useLogin';

const useSchedule = (selectedId: number) => {
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

  const [, setNowMember] = useAtom(memberAtom);

  useEffect(() => {
    if (!scheduleData) return;
    setNowMember((prev) => ({ ...prev, totalWorkTime: scheduleData?.totalTime }));
  }, [scheduleData]);

  const dateOnClick = (isFixed: boolean, date: string) => {
    const newObj = { date: date, isFixed: isFixed };
    setSelectedDate((prev) => newObj);
  };

  return { scheduleData, selectedDate, dateOnClick };
};

export default useSchedule;
