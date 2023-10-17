import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/getSchedule';
import { useAtom } from 'jotai';
import { dateAtom, memberAtom, monthAtom } from 'pages/admin/MainPage/ScheduleSection';
import React, { useEffect } from 'react';
import { MonthBox, WeekGrid } from 'components/@commons-feature/calendar/CalendarStyle';
import CalendarDayBox from './CalendarDayBox';

interface Props {
  selectedId: number;
}
interface DailyData {
  date: string;
  workTime: string[] | null;
}

const CalenderConents = ({ selectedId }: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useAtom(dateAtom);
  const [nowMonth] = useAtom(monthAtom);

  const { year, month } = { ...nowMonth };

  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, selectedId],
    () => getMonthly({ year: year, month: month, memberId: selectedId }),
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
      {scheduleData?.table.map((weekArray: DailyData[], i) => (
        <WeekGrid key={`${i}주`}>
          {weekArray.map((e: DailyData) => (
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
