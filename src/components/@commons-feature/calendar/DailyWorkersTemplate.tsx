import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';

import Text from 'components/@commons/Text';
import { NameBox, TitleBox } from './DailyWorkersStyle';

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

const DailyWorkersTemplate = ({ dailyData }: { dailyData: TimeData[] }): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull $gap="3%">
      {dailyData.map((timeData: TimeData) => (
        <FlexContainer key={timeData.title} $wFull $gap="10px">
          <TitleBox $time={timeData.title}>
            <Text block size="lg" weight="semiBold">
              {timeData.title + ' (' + timeData.workerList.length + ')'}
            </Text>
            <Text>
              {timeData.startTime.slice(0, -3)} ~ {timeData.endTime.slice(0, -3)}
            </Text>
          </TitleBox>
          <FlexContainer $gap="8px">
            {timeData.workerList.map((w: Worker, i) => (
              <NameBox key={w.name + i}>
                <Text>{w.name}</Text>
              </NameBox>
            ))}
          </FlexContainer>
        </FlexContainer>
      ))}
    </FlexContainer>
  );
};

export default DailyWorkersTemplate;
