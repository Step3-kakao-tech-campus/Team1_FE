import { useAtom } from 'jotai';
import React from 'react';
import { selectedWeekAtom, weekStatusMonthAtom } from '..';
import { useQuery } from '@tanstack/react-query';
import { getWeekProgress } from 'apis/weekProgress';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { BorderWeekBox, WeekStatusBar, WeekContainer } from 'components/PageStyledComponents/admin/SelectWeekPage';
import Text from 'components/@commons/Text';
import StatusDailyBox from './StatusDailyBox';
import { WeekStatusData, WeekStatusTypes } from 'apis/types';
import { getLoginData } from 'utils/loginDatahandlers';

const StatusCalendar = (): JSX.Element => {
  const isAdmin = getLoginData().isAdmin;
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const [nowMonth] = useAtom(weekStatusMonthAtom);
  const { year, month } = nowMonth;

  const { data: weekStatusData } = useQuery(
    ['getWeekProgress', year, month, 1],
    () => getWeekProgress({ year: year, month: month }),
    {
      suspense: true,
    },
  );

  const weekOnClickHandler = (weekObj: WeekStatusData) => {
    if (!isAdmin && weekObj.weekStatus !== 'inProgress') return;
    const newObj = { startWeekDate: weekObj.dates[0], weekStatus: weekObj.weekStatus };
    setSelectedWeek(newObj);
  };

  const statusConverter = (weekStatus: WeekStatusTypes) => {
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
      {weekStatusData?.table.map((weekObj: WeekStatusData, i) => (
        <WeekContainer key={`${i}주`} onClick={() => weekOnClickHandler(weekObj)}>
          <WeekStatusBar $status={weekObj.weekStatus}>
            <Text size="xs" weight="regular">
              {statusConverter(weekObj.weekStatus)}
            </Text>
          </WeekStatusBar>
          {weekObj.dates[0] === selectedWeek.startWeekDate && <BorderWeekBox />}

          <WeekGrid>
            {weekObj.dates.map((date: string) => (
              <StatusDailyBox date={date} key={date} />
            ))}
          </WeekGrid>
        </WeekContainer>
      ))}
    </MonthBox>
  );
};

export default StatusCalendar;
