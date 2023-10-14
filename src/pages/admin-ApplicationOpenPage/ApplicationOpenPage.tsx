import PageContainer from 'components/@commons/PageContainer';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { atom, useAtomValue } from 'jotai';

interface TimeData {
  title: string;
  startTime: string;
  endTime: string;
}

export const timeTemplateAtom = atom<TimeData[]>([]);
export const weeklyPeopleAtom = atom<number[][]>([[], [], [], [], [], [], []]);
export const openStepAtom = atom(1);

const ApplicationOpenPage = (): JSX.Element => {
  const startWeekDate = useLocation().state.startWeekDate;
  const step = useAtomValue(openStepAtom);

  return <PageContainer justify="start">content</PageContainer>;
};

export default ApplicationOpenPage;
