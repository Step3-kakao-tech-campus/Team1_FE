import { TimeWorkerListData, UserData } from 'apis/types';
import FlexContainer from 'components/@commons/FlexContainer';
import GrayBox from 'components/@commons/GrayBox';
import Text from 'components/@commons/Text';
import { strTimeProcessor } from 'utils/strTimeProcessor';
import { NameBox, TitleBox } from './styles';

export const DailyWorkersTable = ({ dailyData }: { dailyData: TimeWorkerListData[] | undefined }): JSX.Element => {
  return (
    <FlexContainer $direction="row" $wFull $gap="3%" data-testid="일간근무표">
      {dailyData?.map((timeData: TimeWorkerListData, timeindex) => (
        <FlexContainer key={`${timeData.title}${timeindex}`} $wFull $gap="10px">
          <TitleBox $timeIndex={timeindex}>
            <Text block size="lg" weight="semiBold">
              {timeData.title + ' (' + timeData.workerList.length + ')'}
            </Text>
            <Text>
              {strTimeProcessor(timeData.startTime)} ~ {strTimeProcessor(timeData.endTime)}
            </Text>
          </TitleBox>
          <FlexContainer as="ol" $gap="8px">
            {timeData.workerList.map((w: UserData, i) => (
              <NameBox as="li" key={`${w.name}${i}`}>
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
    <GrayBox data-testid="미확정일간근무표">
      <Text size="lg" weight="medium">
        아직 확정된 스케줄이 없습니다
      </Text>
    </GrayBox>
  );
};
