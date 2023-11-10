import { to2Dimension } from 'apis/schedule/getMonthly';
import { DailyWorkTimeData } from 'apis/types';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { useAtomValue } from 'jotai';
import CalendarDayBox from 'pages/SchedulePage/CalendarSection/CalendarDayBox';
import { monthAtom } from 'pages/SchedulePage/states';

const EmptyCalendar = (): JSX.Element => {
  const selectedMonth = useAtomValue(monthAtom);

  return (
    <MonthBox $wFull data-testid="빈캘린더">
      {to2Dimension({ ...selectedMonth, monthly: [] }).table.map((weekArray: DailyWorkTimeData[], i) => (
        <WeekGrid key={`${i}주`} $aspectRatio="5.6">
          {weekArray.map((e: DailyWorkTimeData) => (
            <CalendarDayBox key={e.date} dateString={e.date} timeList={[]} isSelected={false} />
          ))}
        </WeekGrid>
      ))}
    </MonthBox>
  );
};

export default EmptyCalendar;
