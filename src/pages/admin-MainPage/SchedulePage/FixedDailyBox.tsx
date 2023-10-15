import React from 'react';
import {
  Badge,
  BadgeCont,
  BadgeText,
  BorderBox,
  DateCircle,
  OutterDayBox,
} from 'components/@commons-feature/calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import { dateToString } from 'utils/dateToString';

interface DayBoxProps {
  dateString: string;
  timeList: string[] | null;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
}

const FixedDailyBox = ({ dateString, timeList, onClick, isSelected }: DayBoxProps): JSX.Element => {
  const date = dateString.split('-').map((e) => Number.parseInt(e))[2];

  return (
    <OutterDayBox onClick={onClick} $disabled={timeList === null}>
      {isSelected && <BorderBox />}
      <DateCircle $isToday={dateString === dateToString(new Date())}>
        <Text size="xs" weight="regular">
          {date}
        </Text>
      </DateCircle>
      <BadgeCont>
        {!!timeList &&
          timeList.map((t) => (
            <Badge key={t} $time={t}>
              <BadgeText>{t}</BadgeText>
            </Badge>
          ))}
      </BadgeCont>
    </OutterDayBox>
  );
};

export default FixedDailyBox;
