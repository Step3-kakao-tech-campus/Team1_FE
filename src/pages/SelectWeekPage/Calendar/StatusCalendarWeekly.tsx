import { DateCircle, OutterDayBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import React from 'react';
import { stringDateIsToday } from 'utils/dateToString';

const StatusCalendarWeekly = ({ dates }: { dates: string[] }): JSX.Element => {
  return (
    <WeekGrid $aspectRatio="7.7">
      {dates.map((date) => (
        <OutterDayBox $disabled={false} key={date}>
          <DateCircle $isToday={stringDateIsToday(date)}>
            <Text size="xs" weight="regular">
              {date.split('-')[2]}
            </Text>
          </DateCircle>
        </OutterDayBox>
      ))}
    </WeekGrid>
  );
};

export default StatusCalendarWeekly;
