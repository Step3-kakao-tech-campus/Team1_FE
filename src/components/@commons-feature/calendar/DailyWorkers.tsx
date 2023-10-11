import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import { useQuery } from '@tanstack/react-query';
import { getDailyWorkers } from 'apis/getSchedule';

import Text from 'components/@commons/Text';
import { NameBox, TitleBox } from './DailyWorkersStyle';

interface Props {
  date: string;
}

interface TimeData {
  title: string;
  workerList: Worker[];
  startTime: string;
  endTime: string;
}

interface Worker {
  name: string;
  memberId: number;
}

const DailyWorkers = ({ date }: Props): JSX.Element => {
  const { data: dailyData } = useQuery([date], () => getDailyWorkers({ date: date }), {
    suspense: true,
  });

  return (
    <FlexContainer $wFull>
      {dailyData && (
        <FlexContainer $direction="row">
          {dailyData.data.schedule.map((timeData: TimeData) => (
            <FlexContainer key={timeData.title} $wFull $gap="10px">
              <TitleBox $time={timeData.title}>
                <Text block size="lg" weight="semiBold">
                  {timeData.title + ' (' + timeData.workerList.length + ')'}
                </Text>
                <Text>
                  {timeData.startTime.slice(0, -3)}~ {timeData.endTime.slice(0, -3)}
                </Text>
              </TitleBox>
              <FlexContainer $gap="8px">
                {timeData.workerList.map((w: Worker) => (
                  <NameBox key={w.name}>
                    <Text>{w.name}</Text>
                  </NameBox>
                ))}
              </FlexContainer>
            </FlexContainer>
          ))}
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default DailyWorkers;
