import React from 'react';
import ColorBox from 'components/@commons/ColorBox';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { AddButton, CloseButton } from 'components/@commons/iconButtons';
import { ButtonContainer, InputTime, InputTitle } from 'components/PageStyledComponents/admin/ApplicationOpenPage';
import useTimeTemplate from 'hooks/admin/ApplicationOpenPage/useTimeTemplate';

import { myTheme } from 'styles/myTheme';
import { TimeData } from 'apis/types';

const EditTimeForm = ({ startWeekDate }: { startWeekDate: string }) => {
  const { timeTemplate, formChangeHandler, deleteHandler, addHandler, submitHandler } = useTimeTemplate(startWeekDate);

  return (
    <FlexContainer $wFull $align="center" $gap="30px">
      {timeTemplate.map((time: TimeData, i: number) => (
        <ColorBox $wFull key={`key${i}`} $background={myTheme.color.lightYellow}>
          <FlexContainer $wFull $padding="20px">
            <FlexContainer $position="relative" $direction="row" $wFull>
              <InputTitle
                id="title"
                value={time.title}
                onChange={(e) => formChangeHandler(e, i)}
                placeholder="시간대 이름을 입력하세요"
              />
              <ButtonContainer>
                <CloseButton onClick={() => deleteHandler(i)} />
              </ButtonContainer>
            </FlexContainer>

            <FlexContainer $direction="row">
              <InputTime id="startTime" type="time" value={time.startTime} onChange={(e) => formChangeHandler(e, i)} />
              <Text margin="0">~</Text>
              <InputTime id="endTime" type="time" value={time.endTime} onChange={(e) => formChangeHandler(e, i)} />
            </FlexContainer>
          </FlexContainer>
        </ColorBox>
      ))}
      <AddButton onClick={addHandler} />
      <SubmitButton onClick={submitHandler}>요일별 모집 인원 설정하기</SubmitButton>
    </FlexContainer>
  );
};

export default EditTimeForm;
