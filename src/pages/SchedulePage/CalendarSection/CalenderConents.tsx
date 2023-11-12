import { DailyWorkTimeData } from 'apis/types';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGetMonthly } from 'pages/SchedulePage/hooks/fetch';
import { dateAtom, monthAtom } from '../states';
import CalendarDayBox from './CalendarDayBox';

const CalenderConents = (): JSX.Element => {
  const selectedMonth = useAtomValue(monthAtom);
  const { scheduleData } = useGetMonthly(selectedMonth);

  const selectedDate = useAtomValue(dateAtom);
  const setSelectedDate = useSetAtom(dateAtom);

  return (
    <MonthBox $wFull data-testid="월간스케줄">
      {scheduleData?.table.map((weekArray: DailyWorkTimeData[], i) => (
        <WeekGrid key={`${i}주`} $aspectRatio="5.6">
          {weekArray.map((e: DailyWorkTimeData) => (
            <CalendarDayBox
              key={e.date}
              dateString={e.date}
              timeList={e.workTime}
              onClick={() => setSelectedDate({ isFixed: e.workTime !== null, date: e.date })}
              isSelected={selectedDate.date === e.date}
              colors={scheduleData.badgeColor}
            />
          ))}
        </WeekGrid>
      ))}
    </MonthBox>
  );
};

export default CalenderConents;
