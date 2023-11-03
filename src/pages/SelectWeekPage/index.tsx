import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import Skeleton from 'components/Suspenses/Skeleton';
import AdminDetailSect from 'pages/SelectWeekPage/AdminDetailSection';
import AlbaSubmitButton from 'pages/SelectWeekPage/AlbaSubmitButton';
import StatusCalendar from 'pages/SelectWeekPage/Calendar/StatusCalendar';
import { weekStatusMonthAtom } from 'pages/SelectWeekPage/states';
import { Suspense } from 'react';

const SelectWeekPage = ({ isAdmin }: { isAdmin: boolean }): JSX.Element => {
  return (
    <PageContainer justify="start">
      <FlexContainer $wFull $justify="start" $gap="8px">
        <CalenderOutter monthDataAtom={weekStatusMonthAtom} />
        <Suspense fallback={<Skeleton aspectRatio="1.54" isDeffered />}>
          <StatusCalendar />

          <FlexContainer $wFull $padding="16px 0">
            {isAdmin ? <AdminDetailSect /> : <AlbaSubmitButton />}
          </FlexContainer>
        </Suspense>
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;
