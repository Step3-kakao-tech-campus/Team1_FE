import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/getSchedule';
import { useAtom } from 'jotai';
import { dateAtom, monthAtom } from 'pages/admin-MainPage/SchedulePage/AdminScheduleSection';
import React from 'react';
import { MonthBox, WeekGrid } from 'components/@commons-feature/calendar/CalendarStyle';
import FixedDailyBox from './FixedDailyBox';

interface Props {
  selectedId: number;
}
interface DailyData {
  date: string;
  workTime: string[] | null;
}

const FixedMonthlyConents = ({ selectedId }: Props): JSX.Element => {
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

  const dateOnClick = (isFixed: boolean, date: string) => {
    const newObj = { date: date, isFixed: isFixed };
    setSelectedDate((prev) => newObj);
  };

  return (
    <MonthBox $wFull>
      {scheduleData?.table.map((weekArray: DailyData[], i) => (
        <WeekGrid key={`${i}주`}>
          {weekArray.map((e: DailyData) => (
            <FixedDailyBox
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

export default FixedMonthlyConents;
