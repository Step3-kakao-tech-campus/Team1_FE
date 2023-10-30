import React from 'react';
import { useAtomValue } from 'jotai';
import { MonthBox, WeekGrid } from 'components/Calendar/CalendarStyle';
import { BorderWeekBox, WeekStatusBar, WeekContainer } from 'components/PageStyledComponents/admin/SelectWeekPage';
import StatusDailyBox from './StatusDailyBox';
import { WeekStatusData } from 'apis/types';
import { useGetWeekProgress } from 'hooks/SelectWeekPage/fetch';
import useSelectWeek from 'hooks/SelectWeekPage/useSelectWeek';
import { selectedWeekAtom } from '../states';

const StatusCalendar = (): JSX.Element => {
  const { weekStatusData } = useGetWeekProgress();
  const { weekOnClickHandler, statusConverter } = useSelectWeek();
  const selectedWeek = useAtomValue(selectedWeekAtom);

  return (
    <MonthBox $wFull>
      {weekStatusData?.table.map((weekObj: WeekStatusData, i) => (
        <WeekContainer key={`${i}주`} onClick={() => weekOnClickHandler(weekObj)}>
          <WeekStatusBar $status={weekObj.weekStatus}>{statusConverter(weekObj.weekStatus)}</WeekStatusBar>
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
