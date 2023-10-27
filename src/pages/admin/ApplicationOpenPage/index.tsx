import React from 'react';
import { useLocation } from 'react-router-dom';
import { atom, useAtomValue } from 'jotai';
import PageContainer from 'components/@commons/PageContainer';
import SetPeopleSection from './SetPeopleSection';
import SetTimeSection from './SetTimeTemplateSection';
import { TimeData } from 'apis/types';

export const timeTemplateAtom = atom<TimeData[]>([]);
export const weeklyPeopleAtom = atom<number[][]>([new Array(7).fill([])]);
export const openStepAtom = atom<'setTime' | 'setAmount'>('setTime');

const ApplicationOpenPage = (): JSX.Element => {
  const state = useLocation().state;
  if (state === null) {
    throw { name: 'clientError' };
  }
  const startWeekDate = state.startWeekDate;
  const step = useAtomValue(openStepAtom);

  return (
    <PageContainer justify="start">
      {step === 'setTime' && <SetTimeSection startWeekDate={startWeekDate} />}
      {step === 'setAmount' && <SetPeopleSection startWeekDate={startWeekDate} />}
    </PageContainer>
  );
};

export default ApplicationOpenPage;
