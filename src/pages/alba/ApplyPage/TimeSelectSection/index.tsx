import React from 'react';
import DailyTimeSelectForm from './DailyTimeSelectForm';
import FlexContainer from 'components/@commons/FlexContainer';
import useWeekSelector from 'hooks/useWeekSelector';
import Text from 'components/@commons/Text';
import { stringDateMoveKor } from 'utils/dateToString';
import BorderBox from 'components/@commons/BorderBox';

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

      <DailyTimeSelectForm day={day} startWeekDate={startWeekDate} />
    </FlexContainer>
  );
};
export default TimeSelectSection;
