import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import PageContainer from 'components/@commons/PageContainer';
import Text from 'components/@commons/Text';
import useWeekSelector from 'hooks/useWeekSelector';
import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { stringDateMove } from 'utils/stringDateMove';
import SubmitButton from 'components/@commons/SubmitButton';
import { useQuery } from '@tanstack/react-query';
import { getApplyForm } from 'apis/alba/apply';

const ApplyPage = (): JSX.Element => {
  const startWeekDate = useLocation().state.startWeekDate;
  const { day, WeekBarComponent } = useWeekSelector(0);

  return (
    <PageContainer>
      <FlexContainer $wFull $gap="40px">
        <WeekBarComponent />
        <BorderBox width="100%" border>
          <FlexContainer $padding="20px">
            <Text size="xl">{stringDateMove(startWeekDate, day)}</Text>
          </FlexContainer>
        </BorderBox>
        <Suspense>
          <TimeSelectSection startWeekDate={startWeekDate} />
        </Suspense>
        <SubmitButton>미리보기</SubmitButton>
      </FlexContainer>
    </PageContainer>
  );
};

export default ApplyPage;

const TimeSelectSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const selectHandler = () => {};
  const { data: Res } = useQuery(
    ['getApplyForm', startWeekDate],
    () => getApplyForm({ startWeekDate: startWeekDate }),
    {
      suspense: true,
    },
  );
  return (
    <>
      <BorderBox width="100%" gradation>
        <FlexContainer $wFull $padding="20px" $direction="row" onClick={selectHandler}>
          <input type="checkbox"></input>
          <Text margin="0">타임</Text>
          <Text margin="0 0 0 auto">StartTime ~ EndTime</Text>
        </FlexContainer>
      </BorderBox>
    </>
  );
};
