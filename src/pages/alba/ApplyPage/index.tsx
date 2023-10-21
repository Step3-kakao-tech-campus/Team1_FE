import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import { atom, useAtomValue } from 'jotai';
import { SelectedSchedule } from 'apis/alba/apply';
import weekdayArray from 'utils/weekdayArray';
import TimeSelectSection from './TimeSelectSection';
import { TimeData } from 'apis/admin/application/open';
import PreviewSection from './PreviewSection';

export const weeklySelectAtom = atom<SelectedSchedule[][]>(weekdayArray.map(() => []));
export const timeTemplateAtom = atom<{ [index: number]: TimeData }>({});
export const applyStepAtom = atom(1);

const ApplyPage = (): JSX.Element => {
  const startWeekDate = useLocation().state.startWeekDate;
  const step = useAtomValue(applyStepAtom);

  return (
    <PageContainer justify="start">
      {step === 1 && (
        <Suspense>
          <TimeSelectSection startWeekDate={startWeekDate} />
        </Suspense>
      )}
      {step === 2 && (
        <Suspense>
          <PreviewSection startWeekDate={startWeekDate} />
        </Suspense>
      )}
    </PageContainer>
  );
};

export default ApplyPage;
