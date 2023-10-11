import { useAtom } from 'jotai';
import React from 'react';
import { selectedWeekAtom, weekStatusMonthAtom } from './SelectWeekPage';
import { useQuery } from '@tanstack/react-query';
import { getWeekProgress } from 'apis/getWeekProgress';
import {
  DateCont,
  InnerDayBox,
  MonthBox,
  OutterDayBox,
  WeekGrid,
} from 'components/@commons-feature/calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import styled from 'styled-components';
import { dateToString } from 'utils/dateToString';

const SelectWeekInner = (): JSX.Element => {
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const [nowMonth] = useAtom(weekStatusMonthAtom);
  const { year, month } = { ...nowMonth };

  const { data: weekStatusData } = useQuery(
    ['getWeekProgress', year, month, 1],
    () => getWeekProgress({ year: year, month: month }),
    {
      suspense: true,
    },
  );

  const weekOnClickHandler = (startWeekDate: string) => {
    setSelectedWeek((prev) => startWeekDate);
  };

  return (
    <>
      <MonthBox $wFull>
        {weekStatusData?.table.map((weekObj: { weekStatus: WeekStatus; dates: string[] }, i) => (
          <WeekContainer key={`${i}주`} onClick={() => weekOnClickHandler(weekObj.dates[0])}>
            <StatusBar $status={weekObj.weekStatus}>
              <Text size="xs" weight="regular">
                {weekObj.weekStatus}
              </Text>
            </StatusBar>

            {weekObj.dates[0] === selectedWeek && <Test></Test>}

            <WeekGrid key={`${i}주`}>
              {weekObj.dates?.map((date: string) => (
                <DayBox key={date}>
                  <InnerDayBox>
                    <DateCont $isToday={date === dateToString(new Date())}>
                      <Text size="xs" weight="regular">
                        {date.split('-')[2]}
                      </Text>
                    </DateCont>
                  </InnerDayBox>
                </DayBox>
              ))}
            </WeekGrid>
          </WeekContainer>
        ))}
      </MonthBox>
    </>
  );
};

export default SelectWeekInner;

type WeekStatus = 'allocatable' | 'inProgress' | 'closed';

const Test = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #ffdf39;
  z-index: 996;
  box-shadow: 0 0 0 3px #ffdf39 inset;
`;

const WeekContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const StatusBar = styled.div<{ $status: WeekStatus }>`
  width: 100%;
  position: absolute;
  bottom: 10%;
  z-index: 995;
  background-color: ${(props) =>
    props.$status === 'allocatable'
      ? props.theme.color.lightBlue
      : props.$status === 'inProgress'
      ? props.theme.color.yellow
      : props.theme.color.gray};
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px;
`;

const DayBox = styled(OutterDayBox)`
  aspect-ratio: 1.125;
  background: none;
`;
