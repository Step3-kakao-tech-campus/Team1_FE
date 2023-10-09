import React from 'react';
import FlexContainer from '../../@commons/FlexContainer';
import { useQuery } from '@tanstack/react-query';
import { getDailyWorkers } from 'apis/getSchedule';
import styled from 'styled-components';
import Text from '../../@commons/Text';

interface Props {
  date: string;
}

const DailyWorkers = ({ date }: Props): JSX.Element => {
  const [y, m, d] = date.split('-').map((e) => Number.parseInt(e));
  const { data: obj } = useQuery([date], () => getDailyWorkers(y, m, d), { suspense: true });

  return (
    <FlexContainer $wFull>
      {obj && (
        <FlexContainer $direction="row">
          {obj.data.schedule.map((timeData: any) => (
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
                {timeData.workerList.map((w: any) => (
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

const TitleBox = styled(FlexContainer)<{ $time?: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.$time &&
    (props.$time === '오픈'
      ? props.theme.color.open
      : props.$time === '미들'
      ? props.theme.color.middle
      : props.theme.color.close)};
  align-items: center;
  gap: 0;
  padding: 4px;
`;

const NameBox = styled.div`
  background-color: ${({ theme }) => theme.color.lightGray};
  text-align: center;
`;
