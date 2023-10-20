import React from 'react';
import BorderBox from 'components/@commons/BorderBox';
import FlexContainer from 'components/@commons/FlexContainer';
import Text from 'components/@commons/Text';
import useApply from 'hooks/alba/useApply';
import { useAtomValue, useSetAtom } from 'jotai';
import { stringDateMove } from 'utils/stringDateMove';
import weekdayArray from 'utils/weekdayArray';
import { applyStepAtom, weeklySelectAtom } from '..';
import SubmitButton from 'components/@commons/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';

const PreviewSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { findTimeData } = useApply(startWeekDate);

  const weeklySelect = useAtomValue(weeklySelectAtom);
  const setStep = useSetAtom(applyStepAtom);
  const prevBtnHandler = () => {
    setStep(1);
  };

  const navigate = useNavigate();
  return (
    <FlexContainer $wFull $gap="36px">
      <button onClick={prevBtnHandler}> 편집하기 </button>
      <FlexContainer $wFull>
        {weekdayArray.map((weekday, dayIndex) => (
          <BorderBox gradation key={stringDateMove(startWeekDate, dayIndex)}>
            <FlexContainer $wFull $direction="row" $padding="20px">
              <Text margin="0">{stringDateMove(startWeekDate, dayIndex)}</Text>
              <Text margin="0 auto 0 0">{weekday.kor}</Text>
              {weeklySelect[dayIndex].map(
                (object) =>
                  object.isChecked && (
                    <Text margin="0 0 0 auto" key={object.workTimeId}>
                      {findTimeData(object.workTimeId).title}
                    </Text>
                  ),
              )}
            </FlexContainer>
          </BorderBox>
        ))}
      </FlexContainer>
      <SubmitButton onClick={() => navigate(convertPath('/'))}>제출하기</SubmitButton>
    </FlexContainer>
  );
};

export default PreviewSection;
