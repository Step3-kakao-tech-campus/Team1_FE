import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import React, { Suspense } from 'react';
import { atom } from 'jotai';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import MonthlyContents from './MonthlyContents';
import WeeklyDatail from './WeeklyDatail';

export const weekStatusMonthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() });
export const selectedWeekAtom = atom({ startWeekDate: '', weekStatus: '' });

const SelectWeekPage = (): JSX.Element => {
  return (
    <PageContainer justify="start">
      <FlexContainer $wFull>
        <CalenderOutter monthDataAtom={weekStatusMonthAtom}>
          <Suspense>
            <MonthlyContents />
          </Suspense>
        </CalenderOutter>
      </FlexContainer>
      <FlexContainer $wFull>
        <WeeklyDatail />
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;
