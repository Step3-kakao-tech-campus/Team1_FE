import { DailyWorkTimeData } from 'apis/types';
import { Badge, BadgeCont, BadgeText, MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGetMonthly } from 'pages/SchedulePage/hooks/fetch';
import { dateAtom, monthAtom } from '../states';
import CalendarDayBox from './CalendarDayBox';

const ScheduleCalendar = (): JSX.Element => {
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
            >
              <BadgeCont>
                {e.workTime?.map((title) => (
                  <Badge key={title} $color={scheduleData.badgeColor[title]}>
                    <BadgeText>{title}</BadgeText>
                  </Badge>
                ))}
              </BadgeCont>
            </CalendarDayBox>
          ))}
        </WeekGrid>
      ))}
    </MonthBox>
  );
};

export default ScheduleCalendar;
