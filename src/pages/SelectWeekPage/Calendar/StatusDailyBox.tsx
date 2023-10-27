import { DateCircle, OutterDayBox } from 'components/Calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import React from 'react';
import { stringDateIsToday } from 'utils/dateToString';

const StatusDailyBox = ({ date }: { date: string }): JSX.Element => {
  return (
    <OutterDayBox $disabled={false} $aspectRatio="1.1">
      <DateCircle $isToday={stringDateIsToday(date)}>
        <Text size="xs" weight="regular">
          {date.split('-')[2]}
        </Text>
      </DateCircle>
    </OutterDayBox>
  );
};

export default StatusDailyBox;
