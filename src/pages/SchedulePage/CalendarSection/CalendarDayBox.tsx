import Text from 'components/@commons/Text';
import { BorderDayBox, DateCircle, OutterDayBox } from 'components/Calendar/CalendarStyle';
import React from 'react';
import { stringDateIsToday } from 'utils/dateToString';

interface Props {
  dateString: string;
  timeList: string[] | null;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
  children?: React.ReactNode;
}

const CalendarDayBox = ({ dateString, timeList, onClick, isSelected, children }: Props): JSX.Element => {
  return (
    <OutterDayBox onClick={onClick} $disabled={timeList === null}>
      {isSelected && <BorderDayBox />}
      <DateCircle $isToday={stringDateIsToday(dateString)}>
        <Text size="xs" weight="regular">
          {dateString.split('-')[2]}
        </Text>
      </DateCircle>
      {children}
    </OutterDayBox>
  );
};

export default CalendarDayBox;
