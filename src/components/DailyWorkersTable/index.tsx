import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import { NameBox, TitleBox } from './styles';
import { TimeWorkerListData, UserData } from 'apis/types';
import { strTimeProcessor } from 'utils/strTimeProcessor';
import GrayBox from 'components/@commons/GrayBox';

export const DailyWorkersTable = ({ dailyData }: { dailyData: TimeWorkerListData[] | undefined }): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull $gap="3%">
      {dailyData?.map((timeData: TimeWorkerListData, timeindex) => (
        <FlexContainer key={timeData.title} $wFull $gap="10px">
          <TitleBox $timeIndex={timeindex}>
            <Text block size="lg" weight="semiBold">
              {timeData.title + ' (' + timeData.workerList.length + ')'}
            </Text>
            <Text>
              {strTimeProcessor(timeData.startTime)} ~ {strTimeProcessor(timeData.endTime)}
            </Text>
          </TitleBox>
          <FlexContainer $gap="8px">
            {timeData.workerList.map((w: UserData, i) => (
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

export const NotFixedDateBox = (): JSX.Element => {
  return (
    <GrayBox>
      <Text size="lg" weight="medium">
        아직 확정된 스케줄이 없습니다
      </Text>
    </GrayBox>
  );
};
