import React from 'react';
import { DailyWorkTimeData } from 'apis/types';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import CalendarDayBox from './CalendarDayBox';
import useSchedule from 'hooks/SchedulePage/useSchedule';

const CalenderConents = (): JSX.Element => {
  const { scheduleData, selectedDate, dateOnClick } = useSchedule();
  return (
    <MonthBox $wFull>
      {scheduleData?.table.map((weekArray: DailyWorkTimeData[], i) => (
        <WeekGrid key={`${i}주`}>
          {weekArray.map((e: DailyWorkTimeData) => (
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
