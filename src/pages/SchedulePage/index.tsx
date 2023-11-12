import { UserData } from 'apis/types';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import CalenderOutter, { MonthData } from 'components/Calendar/CalenderOutter';
import Loader from 'components/Suspenses/Loader';
import Skeleton from 'components/Suspenses/Skeleton';
import { useAtom, useAtomValue } from 'jotai';
import EmptyCalendar from 'pages/SchedulePage/CalendarSection/EmptyCalendar';
import ScheduleCalendar from 'pages/SchedulePage/CalendarSection/ScheduleCalendar';
import DailyWorkers from 'pages/SchedulePage/DailyWorkerSection/DailyWorkers';
import Dropdown from 'pages/SchedulePage/HeaderSection/Dropdown';
import TotalWorkTime from 'pages/SchedulePage/HeaderSection/TotalWorkTime';
import { Suspense } from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';
import { memberAtom, monthAtom } from './states';

const SchedulePage = ({ members }: { members?: UserData[] }): JSX.Element => {
  const nowMember = useAtomValue(memberAtom);
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;

  return (
    <PageContainer justify="start" padding="0 20px" maxWidth="600px">
      <FlexContainer $direction="row" $wFull $justify="start" $height="48px" $gap="0">
        <FlexContainer $wFull $align="flex-start">
          {(nowMember.userId !== 0 || !isAdmin) && <TotalWorkTime />}
        </FlexContainer>
        <FlexContainer $hFull $wFull $position="relative">
          {isAdmin && <Dropdown members={members || []} />}
        </FlexContainer>
      </FlexContainer>

      <FlexContainer $wFull $gap="8px">
        <MonthSelector />
        {nowMember.userId !== 0 || !isAdmin ? (
          <Suspense fallback={<Skeleton aspectRatio="1.12" isDeffered />}>
            <ScheduleCalendar />
          </Suspense>
        ) : (
          <EmptyCalendar />
        )}
      </FlexContainer>

      <FlexContainer $wFull>
        <Suspense fallback={<Loader />}>
          <DailyWorkers />
        </Suspense>
      </FlexContainer>
    </PageContainer>
  );
};

export default SchedulePage;

const MonthSelector = () => {
  const [selectedMonth, setter] = useAtom(monthAtom);
  const setMonth = (newMonth: MonthData) => {
    setter(newMonth);
  };
  return <CalenderOutter selectedMonth={selectedMonth} setMonth={setMonth} />;
};
