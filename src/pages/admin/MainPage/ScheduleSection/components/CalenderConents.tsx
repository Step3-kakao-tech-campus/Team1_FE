import { useQuery } from '@tanstack/react-query';
import { DailyScheduleData, getMonthly } from 'apis/getSchedule';
import { useAtom } from 'jotai';
import { dateAtom, memberAtom, monthAtom } from 'pages/admin/MainPage/ScheduleSection';
import React, { useEffect } from 'react';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import CalendarDayBox from './CalendarDayBox';
import useLogin from 'hooks/useLogin';

const CalenderConents = ({ selectedId }: { selectedId: number }): JSX.Element => {
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

  return (
    <MonthBox $wFull>
      {scheduleData?.table.map((weekArray: DailyScheduleData[], i) => (
        <WeekGrid key={`${i}주`}>
          {weekArray.map((e: DailyScheduleData) => (
            <CalendarDayBox
              key={e.date}
              dateString={e.date}
              timeList={e.workTime}
              onClick={() => dateOnClick(e.workTime !== null, e.date)}
              isSelected={selectedDate.date === e.date}
            />
          ))}
        </WeekGrid>
      ))}
    </MonthBox>
  );
};

export default CalenderConents;
