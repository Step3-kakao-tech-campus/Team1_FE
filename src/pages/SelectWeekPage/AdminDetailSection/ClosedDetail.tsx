import React from 'react';
import { useQuery } from '@tanstack/react-query';

import DailyWorkersTemplate from 'components/DailyWorkers/DailyWorkersTemplate';
import useWeekSelector from 'hooks/useWeekSelector';
import { stringDateMove } from 'utils/dateToString';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';

const ClosedDetail = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const date = stringDateMove(startWeekDate, day);

  const { data: scheduleRes } = useQuery(['getDailyWorkers', day], () => getDailyWorkers({ selectedDate: date }), {
    suspense: true,
  });

  return (
    <>
      <WeekBarComponent />
      <DailyWorkersTemplate dailyData={scheduleRes?.schedule} />
    </>
  );
};

export default ClosedDetail;
