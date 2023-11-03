import { WeekStatusData } from 'apis/types';
import { MonthBox } from 'components/Calendar/CalendarStyle';
import { BorderWeekBox, WeekContainer, WeekStatusBar } from 'components/PageStyledComponents/admin/SelectWeekPage';
import { useGetWeekProgress } from 'hooks/SelectWeekPage/fetch';
import useSelectWeek from 'hooks/SelectWeekPage/useSelectWeek';
import { useAtomValue } from 'jotai';
import StatusCalendarWeekly from 'pages/SelectWeekPage/Calendar/StatusCalendarWeekly';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';

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

          <StatusCalendarWeekly dates={weekObj.dates} />
        </WeekContainer>
      ))}
    </MonthBox>
  );
};

export default StatusCalendar;
