import BorderBox from 'components/@commons/BorderBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import TimeSelectSkeleton from 'components/Suspenses/PageSkeletons/TimeSelectSkeleton';
import useWeekSelector from 'hooks/useWeekSelector';
import React from 'react';
import { stringDateMoveKor } from 'utils/dateToString';
import DailyTimeSelectForm from './DailyTimeSelectForm';

const TimeSelectSection = ({ startWeekDate }: { startWeekDate: string; previewPage: React.ReactNode }): JSX.Element => {
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
      <React.Suspense fallback={<TimeSelectSkeleton />}>
        <DailyTimeSelectForm day={day} startWeekDate={startWeekDate} />
      </React.Suspense>
    </FlexContainer>
  );
};
export default TimeSelectSection;
