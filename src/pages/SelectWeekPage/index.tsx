import React, { Suspense } from 'react';
import { atom } from 'jotai';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import StatusCalendar from './Calendar/StatusCalendar';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import AdminDetailSect from 'pages/SelectWeekPage/AdminDetailSection';
import AlbaSubmitButton from 'pages/SelectWeekPage/AlbaSubmitButton';

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
        {isAdmin && <AdminDetailSect />}
        {!isAdmin && <AlbaSubmitButton />}
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;
