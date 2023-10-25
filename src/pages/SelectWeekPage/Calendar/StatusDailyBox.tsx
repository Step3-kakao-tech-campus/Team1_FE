import { DateCircle, OutterDayBox } from 'components/Calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import React from 'react';
import { dateToString } from 'utils/dateToString';

const StatusDailyBox = ({ date }: { date: string }): JSX.Element => {
  return (
    <OutterDayBox $disabled={false} $aspectRatio="1.1">
      <DateCircle $isToday={date === dateToString(new Date())}>
        <Text size="xs" weight="regular">
          {date.split('-')[2]}
        </Text>
      </DateCircle>
    </OutterDayBox>
  );
};

export default StatusDailyBox;
