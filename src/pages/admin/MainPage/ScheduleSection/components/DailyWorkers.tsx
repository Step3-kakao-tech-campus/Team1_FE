import { useQuery } from '@tanstack/react-query';
import { getDailyWorkers } from 'apis/getSchedule';
import DailyWorkersTemplate from 'components/@commons-feature/calendar/DailyWorkersTemplate';
import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';

const DailyWorkers = ({ date }: { date: string }): JSX.Element => {
  const { data: scheduleResponse } = useQuery([date], () => getDailyWorkers({ date: date }), {
    suspense: true,
  });
  return (
    <FlexContainer $wFull>
      {scheduleResponse && <DailyWorkersTemplate dailyData={scheduleResponse?.data.schedule} />}
    </FlexContainer>
  );
};

export default DailyWorkers;
