import { UserData } from 'apis/types';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import CalenderOutter, { MonthData } from 'components/Calendar/CalenderOutter';
import Loader from 'components/Suspenses/Loader';
import Skeleton from 'components/Suspenses/Skeleton';
import { useAtom, useAtomValue } from 'jotai';
import CalenderConents from 'pages/SchedulePage/CalendarSection/CalenderConents';
import DailyWorkers from 'pages/SchedulePage/DailyWorkerSection/DailyWorkers';
import Dropdown from 'pages/SchedulePage/HeaderSection/Dropdown';
import TotalWorkTime from 'pages/SchedulePage/HeaderSection/TotalWorkTime';
import { Suspense } from 'react';
import { getLoginData } from 'utils/loginDatahandlers';
import { memberAtom, monthAtom } from './states';

const SchedulePage = ({ members }: { members?: UserData[] }): JSX.Element => {
  const isAdmin = getLoginData().isAdmin;
  const nowMember = useAtomValue(memberAtom);

  return (
    <PageContainer justify="start" padding="0 20px" maxWidth="600px">
      <FlexContainer $direction="row" $wFull $justify="start" $height="48px" $gap="0">
        <FlexContainer $wFull $align="flex-start">
          {nowMember.isSelected && <TotalWorkTime />}
        </FlexContainer>
        <FlexContainer $hFull $wFull $position="relative">
          {isAdmin && !!members && <Dropdown members={members} />}
        </FlexContainer>
      </FlexContainer>

      {nowMember.isSelected && (
        <FlexContainer $wFull $gap="8px">
          <MonthSelector />
          <Suspense fallback={<Skeleton aspectRatio="1.12" isDeffered />}>
            <CalenderConents />
          </Suspense>
        </FlexContainer>
      )}

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
