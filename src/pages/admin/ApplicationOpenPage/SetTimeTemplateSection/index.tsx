import Text from 'components/@commons/Text';
import React, { Suspense } from 'react';
import { FetchGetOpen, OpenTimeInputs } from './EditTimeForm';
import { stringDateMoveKor } from 'utils/dateToString';
import FlexContainer from 'components/@commons/FlexContainer';
import SetTimeTemplateSkeleton from 'components/Suspenses/PageSkeletons/SetTimeTemplateSkeleton';
import useTimeTemplate from 'hooks/admin/ApplicationOpenPage/useTimeTemplate';
import { TimeData } from 'apis/types';
import ColorBox from 'components/@commons/ColorBox';
import { AddButton } from 'components/@commons/icons/buttons';
import SubmitButton from 'components/@commons/SubmitButton';
import { myTheme } from 'styles/myTheme';

const SetTimeTemplateSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { timeTemplate, updateTimeHandler, deleteHandler, addHandler, goNextHandler } = useTimeTemplate();
  return (
    <>
      <Text size="xl">
        {stringDateMoveKor(startWeekDate, 0)} ~ {stringDateMoveKor(startWeekDate, 6)}
      </Text>

      <Text>근무 시간대를 설정하세요</Text>
      <FlexContainer $wFull $align="center" $gap="30px">
        <Suspense fallback={<SetTimeTemplateSkeleton />}>
          <FetchGetOpen>
            {timeTemplate.map((time: TimeData, timeIndex: number) => (
              <ColorBox $wFull key={`${time.title}${timeIndex}`} $background={myTheme.color.lightYellow}>
                <FlexContainer $wFull $padding="20px">
                  <OpenTimeInputs
                    timeData={time}
                    timeIndex={timeIndex}
                    updater={updateTimeHandler}
                    deleteHandler={deleteHandler}
                    key={`${time.title}${timeIndex}`}
                  />
                </FlexContainer>
              </ColorBox>
            ))}
            <AddButton onClick={addHandler} />
            <SubmitButton onClick={goNextHandler}>요일별 모집 인원 설정하기</SubmitButton>
          </FetchGetOpen>
        </Suspense>
      </FlexContainer>
    </>
  );
};

export default SetTimeTemplateSection;
