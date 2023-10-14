import FlexContainer from 'components/@commons/FlexContainer';
import GradationBox from 'components/@commons/GradationBox';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { InputPeople } from 'components/admin-ApplicationOpenPage/setPeople';
import usePeopleAmount from 'hooks/admin-ApplicationOpenPage/usePeopleAmount';
import React from 'react';

const SetPeopleSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { timeTemplate, submitHandler, goPrevHandler, weeklyAmount, formChangeHandler, day, WeekBarComponent } =
    usePeopleAmount(startWeekDate);

  return (
    <FlexContainer $wFull>
      <button onClick={goPrevHandler}>시간대 수정하기</button>
      <WeekBarComponent />
      {timeTemplate.map((timeData, timeIndex) => (
        <GradationBox key={`${timeIndex}key`}>
          <FlexContainer $wFull $direction="row" $padding="32px 60px" $align="center">
            <Text size="xl" margin="0">
              {timeData.title}
            </Text>
            <Text margin="0 auto 0 0">
              {timeData.startTime} ~ {timeData.endTime}
            </Text>
            <InputPeople
              id="amount"
              type="number"
              value={weeklyAmount[day][timeIndex]}
              onChange={(event) => formChangeHandler(event, timeIndex)}
            />
            <Text size="xl" margin="0">
              명
            </Text>
          </FlexContainer>
        </GradationBox>
      ))}
      <SubmitButton onClick={submitHandler}>스케줄 모집 시작하기 (그룹원에게 알림이 가요!)</SubmitButton>
    </FlexContainer>
  );
};

export default SetPeopleSection;
