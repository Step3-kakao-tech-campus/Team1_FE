import { useQuery } from '@tanstack/react-query';

import DailyWorkersTemplate from 'components/DailyWorkers/DailyWorkersTemplate';
import React, { useMemo } from 'react';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';
import { useAtomValue } from 'jotai';
import { dateAtom } from '../states';
import NotFixedDateBox from 'components/DailyWorkers/NotFixedDateBox';
import SubmitButton from 'components/@commons/SubmitButton';
import { getLoginData } from 'utils/loginDatahandlers';

const DailyWorkers = (): JSX.Element => {
  const isAdmin = getLoginData().isAdmin;

  const selectedDate = useAtomValue(dateAtom);
  const { data: scheduleResponse } = useQuery(
    [selectedDate],
    () => getDailyWorkers({ selectedDate: selectedDate.date }),
    {
      suspense: true,
    },
  );

  if (selectedDate.date === '') {
    return <></>;
  }

  if (!selectedDate.isFixed) {
    return <NotFixedDateBox />;
  }

  return (
    <>
      <DailyWorkersTemplate dailyData={scheduleResponse?.data.schedule} />
      {!isAdmin && <SubmitButton>대타를 구하고 싶어요</SubmitButton>}
    </>
  );
};

export default DailyWorkers;
