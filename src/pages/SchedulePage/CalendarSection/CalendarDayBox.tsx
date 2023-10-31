import React from 'react';
import { Badge, BadgeCont, BadgeText, BorderDayBox, DateCircle, OutterDayBox } from 'components/Calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import { stringDateIsToday } from 'utils/dateToString';

interface Props {
  dateString: string;
  timeList: string[] | null;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
  colors: { [index: string]: string };
}

const CalendarDayBox = ({ dateString, timeList, onClick, isSelected, colors }: Props): JSX.Element => {
  return (
    <OutterDayBox onClick={onClick} $disabled={timeList === null}>
      {isSelected && <BorderDayBox />}
      <DateCircle $isToday={stringDateIsToday(dateString)}>
        <Text size="xs" weight="regular">
          {dateString.split('-')[2]}
        </Text>
      </DateCircle>
      <BadgeCont>
        {timeList?.map((title) => (
          <Badge key={title} $color={colors[title]}>
            <BadgeText>{title}</BadgeText>
          </Badge>
        ))}
      </BadgeCont>
    </OutterDayBox>
  );
};

export default CalendarDayBox;
