import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import SelectRecommendsSection from './SelectRecommendsSection';
import Loader from 'components/Suspenses/Loader';
import useErrorHandler from 'error/useErrorHandler';

const ApplicationClosePage = (): JSX.Element => {
  const { wrongPathHandler } = useErrorHandler();
  const state = useLocation().state;
  if (state === null) {
    wrongPathHandler('/newSchedule');
  }
  const startWeekDate = state.startWeekDate;

  return (
    <PageContainer gap="36px" justify="start">
      <Suspense fallback={<Loader />}>
        <SelectRecommendsSection startWeekDate={startWeekDate} />
      </Suspense>
    </PageContainer>
  );
};

export default ApplicationClosePage;
