import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/schedule/getMonthly';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import useLogin from 'hooks/useLogin';
import { dateAtom, memberAtom, monthAtom, workTimeAtom } from 'pages/SchedulePage/states';

const useSchedule = () => {
  const [selectedDate, setSelectedDate] = useAtom(dateAtom);
  const nowMember = useAtomValue(memberAtom);
  const { year, month } = { ...useAtomValue(monthAtom) };
  const isAdmin = useLogin().getLoginState().isAdmin;

  const [, setWorkTime] = useAtom(workTimeAtom);
  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, nowMember.memberId],
    () => getMonthly({ year: year, month: month, memberId: nowMember.memberId, isAdmin: isAdmin }),
    {
      suspense: true,
      enabled: nowMember.isSelected === true,
      onSuccess: (scheduleData) => {
        setWorkTime((prev) => ({ ...scheduleData?.totalTime }));
      },
    },
  );

  const dateOnClick = (isFixed: boolean, date: string) => {
    const newObj = { date: date, isFixed: isFixed };
    setSelectedDate((prev) => newObj);
  };

  return { scheduleData, selectedDate, dateOnClick };
};

export default useSchedule;
