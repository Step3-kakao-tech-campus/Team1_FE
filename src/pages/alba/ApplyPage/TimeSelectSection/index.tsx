import React, { Suspense } from 'react';
import DailySelect from './DailySelect';
import FlexContainer from 'components/@commons/FlexContainer';
import useWeekSelector from 'hooks/useWeekSelector';
import Text from 'components/@commons/Text';
import { stringDateMoveKor } from 'utils/stringDateMove';
import BorderBox from 'components/@commons/BorderBox';

const TimeSelectSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);

  return (
    <FlexContainer $wFull $gap="40px">
      <WeekBarComponent />
      <BorderBox width="100%" border>
        <FlexContainer $padding="20px">
          <Text size="xl" weight="semiBold">
            {stringDateMoveKor(startWeekDate, day)}
          </Text>
        </FlexContainer>
      </BorderBox>

      <Suspense fallback={<div>체크 항목 로딩..</div>}>
        <DailySelect day={day} startWeekDate={startWeekDate} />
      </Suspense>
    </FlexContainer>
  );
};
export default TimeSelectSection;
