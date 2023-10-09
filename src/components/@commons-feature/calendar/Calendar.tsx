import React from 'react';
import { getMonthly } from 'apis/getSchedule';
import { useQuery } from '@tanstack/react-query';
import Text from 'components/@commons/Text';
import { Badge, BadgeCont, DateCont, InnerDayBox, MonthBox, OutterDayBox, WeekGrid } from './CalendarStyle';
import FlexContainer from '../../@commons/FlexContainer';
import { NextButton, PrevButton } from '../../@commons/iconButtons';
import { dateAtom } from 'components/admin-MainPage/AdminScheduleSection';
import { useAtom } from 'jotai';

interface Props {
  selectedId: number;
}

interface DailyData {
  date: string;
  workTime: string[];
}

const Calendar = ({ selectedId }: Props): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const { data: scheduleData } = useQuery(
    ['getMonthly', year, month, selectedId],
    () => getMonthly(year, month, selectedId),
    {
      suspense: true,
      enabled: selectedId !== 0,
    },
  );

  const [selectedDate, setSelectedDate] = useAtom(dateAtom);

  const dateOnClick = (isFixed: boolean, date: string) => {
    const newObj = { date: date, isFixed: isFixed };
    setSelectedDate((prev) => newObj);
  };

  if (!!scheduleData) {
    return (
      <>
        <FlexContainer $direction="row" $justify="space-between">
          <PrevButton />
          <Text size="lg" weight="bold">{`${year}  ${month + 1} 월`}</Text>
          <NextButton />
        </FlexContainer>

        <MonthBox $wFull>
          {scheduleData.table.map((weekArray: DailyData[], i) => (
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
      </>
    );
  }
  return <></>;
};

export default Calendar;

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
