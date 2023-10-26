import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import { atom, useAtomValue } from 'jotai';
import weekdayArray from 'utils/weekdayArray';
import TimeSelectSection from './TimeSelectSection';
import PreviewSection from './PreviewSection';
import { SelectedTimeData } from 'apis/types';

export const weeklySelectAtom = atom<SelectedTimeData[][]>(weekdayArray.map(() => []));
export const applyStepAtom = atom(1);

const ApplyPage = (): JSX.Element => {
  const state = useLocation().state;
  if (state === null) {
    throw { name: 'clientError' };
  }
  const startWeekDate = state.startWeekDate;
  const step = useAtomValue(applyStepAtom);

  return (
    <PageContainer justify="start">
      {step === 1 && <TimeSelectSection startWeekDate={startWeekDate} />}
      {step === 2 && <PreviewSection startWeekDate={startWeekDate} />}
    </PageContainer>
  );
};

export default ApplyPage;
