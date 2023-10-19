import { DateCircle, OutterDayBox } from 'components/Calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import React from 'react';
import styled from 'styled-components';
import { dateToString } from 'utils/dateToString';

const StatusDailyBox = ({ date }: { date: string }): JSX.Element => {
  return (
    <DailyBox $disabled={false}>
      <DateCircle $isToday={date === dateToString(new Date())}>
        <Text size="xs" weight="regular">
          {date.split('-')[2]}
        </Text>
      </DateCircle>
    </DailyBox>
  );
};

export default StatusDailyBox;

const DailyBox = styled(OutterDayBox)`
  aspect-ratio: 1;
  background: none;
`;
