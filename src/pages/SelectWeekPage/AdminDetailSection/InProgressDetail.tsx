import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getApplyStatus } from 'apis/admin/application';
import { convertPath } from 'apis/convertURI';
import SubmitButton from 'components/@commons/SubmitButton';
import DailyWorkersTemplate from 'components/DailyWorkers/DailyWorkersTemplate';
import useWeekSelector from 'hooks/useWeekSelector';

const InProgressDetail = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { data: applicantsStatusRes } = useQuery(
    ['getApplyStatus', startWeekDate],
    () => getApplyStatus({ startWeekDate: startWeekDate }),
    { suspense: true },
  );
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate(convertPath('/newSchedule/close'), { state: { startWeekDate: startWeekDate } });
  };

  const { day, WeekBarComponent } = useWeekSelector(0);
  return (
    <>
      <SubmitButton onClick={closeHandler}>모집 마감하고 배정하기</SubmitButton>
      <WeekBarComponent />
      <DailyWorkersTemplate dailyData={applicantsStatusRes?.data.applyStatus[day]} />
    </>
  );
};

export default InProgressDetail;
