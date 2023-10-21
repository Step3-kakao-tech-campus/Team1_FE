import React from 'react';
import { useLocation } from 'react-router-dom';
import { atom, useAtomValue } from 'jotai';
import PageContainer from 'components/@commons/PageContainer';
import SetPeopleSection from './SetPeopleSection';
import SetTimeSection from './SetTimeTemplateSection';
import { TimeData } from 'apis/admin/application/open';

export const timeTemplateAtom = atom<TimeData[]>([]);
export const weeklyPeopleAtom = atom<number[][]>([[], [], [], [], [], [], []]);
export const openStepAtom = atom(1);

const ApplicationOpenPage = (): JSX.Element => {
  const startWeekDate = useLocation().state.startWeekDate;
  const step = useAtomValue(openStepAtom);

  return (
    <PageContainer justify="start">
      {step === 1 && <SetTimeSection startWeekDate={startWeekDate} />}
      {step === 2 && <SetPeopleSection startWeekDate={startWeekDate} />}
    </PageContainer>
  );
};

export default ApplicationOpenPage;
