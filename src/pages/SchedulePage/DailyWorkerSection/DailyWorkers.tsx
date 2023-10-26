import { useQuery } from '@tanstack/react-query';

import DailyWorkersTemplate from 'components/DailyWorkers/DailyWorkersTemplate';
import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';
import { getDailyWorkers } from 'apis/schedule/getDailyWorkers';

const DailyWorkers = ({ date }: { date: string }): JSX.Element => {
  const { data: scheduleResponse } = useQuery([date], () => getDailyWorkers({ selectedDate: date }), {
    suspense: true,
  });
  return (
    <FlexContainer $wFull>
      {scheduleResponse && <DailyWorkersTemplate dailyData={scheduleResponse?.data.schedule} />}
    </FlexContainer>
  );
};

export default DailyWorkers;
