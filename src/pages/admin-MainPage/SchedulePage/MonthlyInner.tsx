import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/getSchedule';
import { useAtom } from 'jotai';
import { dateAtom, monthAtom } from 'pages/admin-MainPage/SchedulePage/AdminScheduleSection';
import React from 'react';
import {
  Badge,
  BadgeCont,
  DateCont,
  InnerDayBox,
  MonthBox,
  OutterDayBox,
  WeekGrid,
} from '../../../components/@commons-feature/calendar/CalendarStyle';
import Text from 'components/@commons/Text';

interface Props {
  selectedId: number;
}
interface DailyData {
  date: string;
  workTime: string[] | null;
}

const MonthlyInner = ({ selectedId }: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useAtom(dateAtom);
  const [nowMonth] = useAtom(monthAtom);

  const { year, month } = { ...nowMonth };

  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, selectedId],
    () => getMonthly({ year: year, month: month, memberId: selectedId }),
    {
      suspense: true,
      enabled: selectedId !== 0,
    },
  );

  const dateOnClick = (isFixed: boolean, date: string) => {
    const newObj = { date: date, isFixed: isFixed };
    setSelectedDate((prev) => newObj);
  };

  return (
    <MonthBox $wFull>
      {scheduleData?.table.map((weekArray: DailyData[], i) => (
        <WeekGrid key={`${i}주`}>
          {weekArray.map((e: DailyData) => (
            <DayBox
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

export default MonthlyInner;

interface DayBoxProps {
  dateString: string;
  timeList: string[] | null;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
}

const DayBox = ({ dateString, timeList, onClick, isSelected }: DayBoxProps): JSX.Element => {
  const date = dateString.split('-').map((e) => Number.parseInt(e))[2];

  return (
    <OutterDayBox onClick={onClick} $disabled={timeList === null}>
      <InnerDayBox $isSelected={isSelected}>
        <DateCont $isToday={date === new Date().getDate()}>
          <Text size="xs" weight="regular">
            {date}
          </Text>
        </DateCont>
        <BadgeCont>
          {!!timeList &&
            timeList.map((t) => (
              <Badge key={t} $time={t}>
                <Text size="sm">{t}</Text>
              </Badge>
            ))}
        </BadgeCont>
      </InnerDayBox>
    </OutterDayBox>
  );
};
