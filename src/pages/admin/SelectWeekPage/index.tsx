import React, { Suspense } from 'react';
import { atom } from 'jotai';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import StatusCalendar from './Calendar/StatusCalendar';
import WeeklyDatailSection from './WeeklyDetailSection';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';

export const weekStatusMonthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() });
export const selectedWeekAtom = atom({ startWeekDate: '', weekStatus: '' });

const SelectWeekPage = (): JSX.Element => {
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
        <WeeklyDatailSection />
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;
