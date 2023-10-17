import { useAtom } from 'jotai';
import React from 'react';
import { selectedWeekAtom, weekStatusMonthAtom } from '..';
import { useQuery } from '@tanstack/react-query';
import { getWeekProgress } from 'apis/adminApplication';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import Text from 'components/@commons/Text';
import WeekBoxContents from './WeekBoxContents';
import { BorderWeekBox, WeekStatusBar, WeekContainer } from 'components/PageStyledComponents/admin/SelectWeekPage';

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
          <WeekStatusBar $status={weekObj.weekStatus}>
            <Text size="xs" weight="regular">
              {statusConverter(weekObj.weekStatus)}
            </Text>
          </WeekStatusBar>
          {weekObj.dates[0] === selectedWeek.startWeekDate && <BorderWeekBox />}

          <WeekGrid>
            <WeekBoxContents dates={weekObj.dates} />
          </WeekGrid>
        </WeekContainer>
      ))}
    </MonthBox>
  );
};

export default MonthlyContents;
