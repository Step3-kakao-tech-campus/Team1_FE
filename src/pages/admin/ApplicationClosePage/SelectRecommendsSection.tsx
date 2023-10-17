import React from 'react';
import DailyWorkersTemplate from 'components/@commons-feature/calendar/DailyWorkersTemplate';
import ColorBox from 'components/@commons/ColorBox';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { myTheme } from 'styles/myTheme';
import { stringDateMove } from 'utils/stringDateMove';
import { ScrollContainer } from 'components/PageStyledComponents/admin/ApplicationClose';
import useClose from 'hooks/admin-ApplicationClosePage/useClose';
import useWeekSelector from 'hooks/useWeekSelector';

const SelectRecommendsSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { recommendsRes, selectHandler, candidate, submitHandler } = useClose(startWeekDate);
  const { day, WeekBarComponent } = useWeekSelector(0);

  return (
    <>
      <ScrollContainer>
        {recommendsRes?.data.recommends.map((candidateData: object[][], candidateIndex: number) => (
          <FlexContainer
            $shrink="0"
            $width="32%"
            key={`후보${candidateIndex}`}
            onClick={() => selectHandler(candidateIndex)}
          >
            <ColorBox $wFull $background={myTheme.color.lightGray}>
              <Text margin="30px 20px">후보{candidateIndex + 1}</Text>
            </ColorBox>
          </FlexContainer>
        ))}
      </ScrollContainer>
      <WeekBarComponent />

      <Text>{stringDateMove(startWeekDate, day)}</Text>

      <DailyWorkersTemplate dailyData={recommendsRes?.data.recommends[candidate][day]} />
      <SubmitButton onClick={submitHandler}>스케줄 확정하기 (그룹원에게 알림이 가요!)</SubmitButton>
    </>
  );
};

export default SelectRecommendsSection;
