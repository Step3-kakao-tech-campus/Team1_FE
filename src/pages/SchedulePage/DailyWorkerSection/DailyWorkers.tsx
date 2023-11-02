import React from 'react';
import { useAtomValue } from 'jotai';
import { dateAtom } from '../states';
import { DailyWorkersTable, NotFixedDateBox } from 'components/DailyWorkersTable';
import { useGetDailyWorkers } from 'hooks/SchedulePage/fetch';

const DailyWorkers = (): JSX.Element => {
  const selectedDate = useAtomValue(dateAtom);
  const { scheduleResponse } = useGetDailyWorkers();

  if (selectedDate.date === '') {
    return <></>;
  }

  if (!selectedDate.isFixed || scheduleResponse === null) {
    return <NotFixedDateBox />;
  }

  return (
    <>
      <DailyWorkersTable dailyData={scheduleResponse?.schedule} />
    </>
  );
};

export default DailyWorkers;
