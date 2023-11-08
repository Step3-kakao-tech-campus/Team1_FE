import BorderBox from 'components/@commons/BorderBox';
import ColorBox from 'components/@commons/ColorBox';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import { DailyWorkersTable } from 'components/DailyWorkersTable';
import { ScrollContainer } from 'components/PageStyledComponents/admin/ApplicationClose';
import useWeekSelector from 'hooks/useWeekSelector';
import { useGetRecommends } from 'pages/admin/ApplicationClosePage/hooks/fetch';
import useClose from 'pages/admin/ApplicationClosePage/hooks/useClose';
import { myTheme } from 'styles/myTheme';
import { stringDateMoveKor } from 'utils/dateToString';

const SelectRecommendsSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { recommendsRes } = useGetRecommends(startWeekDate);
  const { setCandidate, candidate, submitHandler } = useClose(startWeekDate);
  const { day, WeekBarComponent } = useWeekSelector(0);

  return (
    <>
      <ScrollContainer>
        {recommendsRes?.data.recommends.map((e, candidateIndex: number) => (
          <FlexContainer
            $shrink="0"
            $width="32%"
            key={`후보${candidateIndex}`}
            onClick={() => setCandidate(candidateIndex)}
          >
            <BorderBox width="100%" border={candidateIndex === candidate} borderColor={myTheme.color.yellow}>
              <ColorBox $wFull $background={myTheme.color.lightGray}>
                <Text margin="30px 20px">후보{candidateIndex + 1}</Text>
              </ColorBox>
            </BorderBox>
          </FlexContainer>
        ))}
      </ScrollContainer>
      <WeekBarComponent />

      <BorderBox width="100%" border>
        <FlexContainer $wFull $padding="16px">
          <Text size="lg" weight="semiBold">
            {stringDateMoveKor(startWeekDate, day)}
          </Text>
        </FlexContainer>
      </BorderBox>

      <DailyWorkersTable dailyData={recommendsRes?.data.recommends[candidate][day]} />
      <SubmitButton onClick={submitHandler}>스케줄 확정하기 (그룹원에게 알림이 가요!)</SubmitButton>
    </>
  );
};

export default SelectRecommendsSection;
