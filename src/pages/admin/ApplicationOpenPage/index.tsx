import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import PageContainer from 'components/@commons/PageContainer';
import SetPeopleSection from './SetPeopleSection';
import SetTimeSection from './SetTimeTemplateSection';
import useErrorHandler from 'error/useErrorHandler';
import { openStepAtom } from './states';

const ApplicationOpenPage = (): JSX.Element => {
  const { wrongPathHandler } = useErrorHandler();
  const state = useLocation().state;
  if (state === null) {
    wrongPathHandler('/newSchedule');
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
