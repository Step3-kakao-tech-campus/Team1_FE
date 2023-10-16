import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'components/@commons/PageContainer';
import SelectRecommendsSection from './SelectRecommendsSection';

const ApplicationClosePage = (): JSX.Element => {
  const startWeekDate = useLocation().state.startWeekDate;

  return (
    <PageContainer gap="36px" justify="start">
      <Suspense fallback={<div> 후보 로딩.. </div>}>
        <SelectRecommendsSection startWeekDate={startWeekDate} />
      </Suspense>
    </PageContainer>
  );
};

export default ApplicationClosePage;
