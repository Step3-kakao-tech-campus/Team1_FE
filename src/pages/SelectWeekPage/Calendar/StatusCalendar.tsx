import { WeekStatusData } from 'apis/types';
import { MonthBox } from 'components/Calendar/CalendarStyle';
import { useAtomValue } from 'jotai';
import StatusCalendarWeekly from 'pages/SelectWeekPage/Calendar/StatusCalendarWeekly';
import { useGetWeekProgress } from 'pages/SelectWeekPage/hooks/fetch';
import useSelectWeek from 'pages/SelectWeekPage/hooks/useSelectWeek';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import { BorderWeekBox, WeekContainer, WeekStatusBar } from 'pages/SelectWeekPage/styles';
import { weekStatusConverter } from 'utils/weekStatusConverter';

const StatusCalendar = (): JSX.Element => {
  const { weekStatusData } = useGetWeekProgress();
  const { weekOnClickHandler } = useSelectWeek();
  const selectedWeek = useAtomValue(selectedWeekAtom);
  return (
    <MonthBox $wFull data-testid="주차선택캘린더">
      {weekStatusData?.table.map((weekObj: WeekStatusData, i) => (
        <WeekContainer onClick={() => weekOnClickHandler(weekObj)} key={`${i}주`} data-testid={`${i}주`}>
          <WeekStatusBar $status={weekObj.weekStatus}>{weekStatusConverter(weekObj.weekStatus)}</WeekStatusBar>
          {weekObj.dates[0] === selectedWeek.startWeekDate && <BorderWeekBox />}

          <StatusCalendarWeekly dates={weekObj.dates} />
        </WeekContainer>
      ))}
    </MonthBox>
  );
};

export default StatusCalendar;
