import { useAtom } from 'jotai';
import React from 'react';
import { selectedWeekAtom, weekStatusMonthAtom } from './SelectWeekPage';
import { useQuery } from '@tanstack/react-query';
import { getWeekProgress } from 'apis/getWeekProgress';
import { MonthBox, WeekGrid } from 'components/@commons-feature/calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import styled from 'styled-components';
import WeekBoxContents from './WeekBoxContents';

type WeekStatus = 'allocatable' | 'inProgress' | 'closed' | '';

interface WeekObj {
  weekStatus: WeekStatus;
  dates: string[];
}

const MonthlyContents = (): JSX.Element => {
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

  const weekOnClickHandler = (weekObj: WeekObj) => {
    const newObj = { startWeekDate: weekObj.dates[0], weekStatus: weekObj.weekStatus };
    setSelectedWeek((prev) => newObj);
  };

  const statusConverter = (weekStatus: WeekStatus) => {
    switch (weekStatus) {
      case 'allocatable':
        return '모집 전';
      case 'inProgress':
        return '모집 중';
      case 'closed':
        return '모집 마감';
    }
  };

  return (
    <MonthBox $wFull>
      {weekStatusData?.table.map((weekObj: WeekObj, i) => (
        <WeekContainer key={`${i}주`} onClick={() => weekOnClickHandler(weekObj)}>
          <StatusBar $status={weekObj.weekStatus}>
            <Text size="xs" weight="regular">
              {statusConverter(weekObj.weekStatus)}
            </Text>
          </StatusBar>
          {weekObj.dates[0] === selectedWeek.startWeekDate && <BorderBox />}

          <WeekGrid>
            <WeekBoxContents dates={weekObj.dates} />
          </WeekGrid>
        </WeekContainer>
      ))}
    </MonthBox>
  );
};

export default MonthlyContents;

const BorderBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 11;
  box-shadow: 0 0 0 3px #ffdf39 inset;
`;

const WeekContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StatusBar = styled.div<{ $status: WeekStatus }>`
  width: 100%;
  position: absolute;
  bottom: 10%;
  z-index: 10;
  background-color: ${(props) =>
    props.$status === 'allocatable'
      ? props.theme.color.lightBlue
      : props.$status === 'inProgress'
      ? props.theme.color.lightYellow
      : props.theme.color.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px;
`;
