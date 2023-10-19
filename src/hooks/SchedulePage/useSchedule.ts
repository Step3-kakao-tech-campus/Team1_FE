import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/schedule/getMonthly';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import useLogin from 'hooks/useLogin';
import { dateAtom, memberAtom, monthAtom, workTimeAtom } from 'pages/SchedulePage/states';

const useSchedule = () => {
  const [selectedDate, setSelectedDate] = useAtom(dateAtom);
  const nowMonth = useAtomValue(monthAtom);
  const nowMember = useAtomValue(memberAtom);

  const { year, month } = { ...nowMonth };
  const isAdmin = useLogin().getLoginState().isAdmin;
  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, nowMember.memberId],
    () => getMonthly({ year: year, month: month, memberId: nowMember.memberId, isAdmin: isAdmin }),
    {
      suspense: true,
      enabled: nowMember.isSelected === true,
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
