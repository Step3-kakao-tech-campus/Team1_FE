import { DailyWorkTimeData } from 'apis/types';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { useGetMonthly } from 'hooks/SchedulePage/fetch';
import useSchedule from 'hooks/SchedulePage/useSchedule';
import { useAtomValue } from 'jotai';
import { dateAtom } from '../states';
import CalendarDayBox from './CalendarDayBox';

const CalenderConents = (): JSX.Element => {
  const { scheduleData } = useGetMonthly();
  const { dateOnClick } = useSchedule();
  const selectedDate = useAtomValue(dateAtom);

  return (
    <MonthBox $wFull data-testid="월간스케줄">
      {scheduleData?.table.map((weekArray: DailyWorkTimeData[], i) => (
        <WeekGrid key={`${i}주`} $aspectRatio="5.6">
          {weekArray.map((e: DailyWorkTimeData) => (
            <CalendarDayBox
              key={e.date}
              dateString={e.date}
              timeList={e.workTime}
              onClick={() => dateOnClick(e.workTime !== null, e.date)}
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
