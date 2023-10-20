import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import PageContainer from 'components/@commons/PageContainer';
import Text from 'components/@commons/Text';
import SubmitButton from 'components/@commons/SubmitButton';
import useWeekSelector from 'hooks/useWeekSelector';
import { stringDateMove } from 'utils/stringDateMove';
import TimeSelectSection from './TimeSelectSection';

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
          <TimeSelectSection startWeekDate={startWeekDate} day={day} />
        </Suspense>
        <SubmitButton>미리보기</SubmitButton>
      </FlexContainer>
    </PageContainer>
  );
};

export default ApplyPage;
