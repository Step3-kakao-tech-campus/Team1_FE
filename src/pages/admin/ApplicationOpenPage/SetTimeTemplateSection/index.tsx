import { TimeData } from 'apis/types';
import ColorBox from 'components/@commons/ColorBox';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { AddButton } from 'components/@commons/icons/buttons';
import SetTimeTemplateSkeleton from 'components/Suspenses/PageSkeletons/SetTimeTemplateSkeleton';
import { useGetOpenTemplate } from 'pages/admin/ApplicationOpenPage/hooks/fetch';
import useTimeTemplate from 'pages/admin/ApplicationOpenPage/hooks/useTimeTemplate';
import { Suspense } from 'react';
import { myTheme } from 'styles/myTheme';
import { stringDateMoveKor } from 'utils/dateToString';
import { OpenTimeInputs } from './EditTimeForm';

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
          <FetchGetOpen startWeekDate={startWeekDate}>
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

const FetchGetOpen = ({ startWeekDate, children }: { startWeekDate: string; children: React.ReactNode }) => {
  const data = useGetOpenTemplate(startWeekDate);
  return <>{children}</>;
};
