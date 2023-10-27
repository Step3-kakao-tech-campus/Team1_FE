import React, { useEffect } from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import Text from 'components/@commons/Text';
import CheckBox from 'components/@commons/CheckBox';
import useApply from 'hooks/alba/useApply';
import SubmitButton from 'components/@commons/SubmitButton';
import TimeSelectSkeleton from 'components/Suspenses/PageSkeletons/TimeSelectSkeleton';

const DailySelect = ({ day, startWeekDate }: { day: number; startWeekDate: string }): JSX.Element => {
  const { weeklySelect, findTimeData, selectTimeHandler, goPreviewHandler, putSaveHandler, isLoading } =
    useApply(startWeekDate);

  // 요일 바뀔 때마다 서버에 저장
  useEffect(() => {
    if (!weeklySelect.some((e) => e.length > 0)) return;
    putSaveHandler(day);
  }, [day]);

  if (isLoading) {
    return <TimeSelectSkeleton />;
  }

  return (
    <>
      <FlexContainer $wFull>
        {weeklySelect[day].map((timeObject, timeIndex) => (
          <label key={timeObject.workTimeId}>
            <BorderBox width="100%" gradation={true}>
              <FlexContainer $wFull $padding="28px" $direction="row" $align="center">
                <CheckBox
                  type="checkbox"
                  onClick={() => selectTimeHandler(timeObject, timeIndex, day)}
                  checked={timeObject.isChecked}
                  readOnly
                />
                <Text size="xl" margin="0">
                  {findTimeData(timeObject.workTimeId)?.title}
                </Text>
                <Text size="xl" margin="0 0 0 auto">
                  {findTimeData(timeObject.workTimeId)?.startTime} ~ {findTimeData(timeObject.workTimeId)?.endTime}
                </Text>
              </FlexContainer>
            </BorderBox>
          </label>
        ))}
      </FlexContainer>
      <SubmitButton onClick={goPreviewHandler}>미리보기</SubmitButton>
    </>
  );
};
export default DailySelect;
