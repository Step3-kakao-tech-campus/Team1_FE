import React from 'react';
import { DailyScheduleData } from 'apis/getSchedule';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import CalendarDayBox from './CalendarDayBox';
import useSchedule from 'hooks/admin/SchedulePage/useSchedule';

const CalenderConents = ({ selectedId }: { selectedId: number }): JSX.Element => {
  const { scheduleData, selectedDate, dateOnClick } = useSchedule(selectedId);

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
