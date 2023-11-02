import React from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import { useAtomValue } from 'jotai';
import TimeSelectSection from './TimeSelectSection';
import PreviewSection from './PreviewSection';
import useErrorHandler from 'error/useErrorHandler';
import { applyStepAtom } from './states';

const ApplyPage = (): JSX.Element => {
  const { wrongPathHandler } = useErrorHandler();
  const state = useLocation().state;
  if (state === null) {
    wrongPathHandler('/apply');
  }
  const startWeekDate = state.startWeekDate;
  const step = useAtomValue(applyStepAtom);

  return (
    <PageContainer justify="start">
      {step === 'checkTime' && <TimeSelectSection startWeekDate={startWeekDate} />}
      {step === 'preview' && <PreviewSection startWeekDate={startWeekDate} />}
    </PageContainer>
  );
};

export default ApplyPage;
