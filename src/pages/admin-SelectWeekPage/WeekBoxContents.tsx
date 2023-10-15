import { DateCircle, OutterDayBox } from 'components/@commons-feature/calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import React from 'react';
import styled from 'styled-components';
import { dateToString } from 'utils/dateToString';

interface Props {
  dates: string[];
}

const WeekBoxContents = ({ dates }: Props): JSX.Element => {
  return (
    <>
      {dates?.map((date: string) => (
        <DailyBox key={date} $disabled={false}>
          <DateCircle $isToday={date === dateToString(new Date())}>
            <Text size="xs" weight="regular">
              {date.split('-')[2]}
            </Text>
          </DateCircle>
        </DailyBox>
      ))}
    </>
  );
};

export default WeekBoxContents;

const DailyBox = styled(OutterDayBox)`
  aspect-ratio: 1;
  background: none;
`;
