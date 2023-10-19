import React, { Suspense } from 'react';
import { atom } from 'jotai';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import StatusCalendar from './Calendar/StatusCalendar';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import WeeklyDatailSection from 'pages/admin/WeeklyStatusPage/WeeklyDetailSection';
import AlbaSelectButton from 'pages/alba/WeeklyStatusPage/SelectButton';

export const weekStatusMonthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() });
export const selectedWeekAtom = atom({ startWeekDate: '', weekStatus: '' });

const SelectWeekPage = ({ isAdmin }: { isAdmin: boolean }): JSX.Element => {
  return (
    <PageContainer justify="start">
      <FlexContainer $wFull>
        <CalenderOutter monthDataAtom={weekStatusMonthAtom}>
          <Suspense>
            <StatusCalendar />
          </Suspense>
        </CalenderOutter>
      </FlexContainer>
      <FlexContainer $wFull>
        {isAdmin && <WeeklyDatailSection />}
        {!isAdmin && <AlbaSelectButton />}
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;
