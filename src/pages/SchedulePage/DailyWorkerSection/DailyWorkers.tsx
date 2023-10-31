import DailyWorkersTemplate from 'components/DailyWorkers/DailyWorkersTemplate';
import React from 'react';
import { useAtomValue } from 'jotai';
import { dateAtom } from '../states';
import NotFixedDateBox from 'components/DailyWorkers/NotFixedDateBox';
import { useGetDailyWorkers } from 'hooks/SchedulePage/fetch';
// import SubmitButton from 'components/@commons/SubmitButton';
// import { getLoginData } from 'utils/loginDatahandlers';

const DailyWorkers = (): JSX.Element => {
  const selectedDate = useAtomValue(dateAtom);
  const { scheduleResponse } = useGetDailyWorkers();
  //  const isAdmin = getLoginData().isAdmin;

  if (selectedDate.date === '') {
    return <></>;
  }

  if (!selectedDate.isFixed) {
    return <NotFixedDateBox />;
  }

  return (
    <>
      <DailyWorkersTemplate dailyData={scheduleResponse?.schedule} />
      {/* {!isAdmin && <SubmitButton>대타를 구하고 싶어요</SubmitButton>} */}
    </>
  );
};

export default DailyWorkers;
