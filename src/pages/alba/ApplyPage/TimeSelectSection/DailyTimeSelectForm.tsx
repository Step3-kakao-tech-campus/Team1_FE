import React from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import Text from 'components/@commons/Text';
import CheckBox from 'components/@commons/CheckBox';
import useSelectTime from 'hooks/alba/apply/useSelectTime';
import TimeSelectSkeleton from 'components/Suspenses/PageSkeletons/TimeSelectSkeleton';
import { useGetApplyForm } from 'hooks/alba/apply/fetch';
import { useAtomValue } from 'jotai';
import { weeklySelectAtom } from '../states';

const DailyTimeSelectForm = ({ day, startWeekDate }: { day: number; startWeekDate: string }): JSX.Element => {
  // get요청 -> 전역상태 업데이트
  const { isLoading } = useGetApplyForm(startWeekDate);
  // 전역상태 불러오기
  const weeklySelect = useAtomValue(weeklySelectAtom);
  // 폼 입력 -> 전역상태 업데이트
  const { selectTimeHandler } = useSelectTime();

  if (isLoading) {
    return <TimeSelectSkeleton />;
  }

  return (
    <>
      <FlexContainer $wFull>
        {weeklySelect[day].map((timeObject, timeIndex) => (
          <label key={timeObject.title}>
            <BorderBox width="100%" gradation={true}>
              <FlexContainer $wFull $padding="28px" $direction="row" $align="center">
                <CheckBox
                  type="checkbox"
                  onClick={() => selectTimeHandler(timeIndex, day)}
                  checked={timeObject.isChecked}
                  readOnly
                />
                <Text size="xl" margin="0">
                  {timeObject.title}
                </Text>
                <Text size="xl" margin="0 0 0 auto">
                  {timeObject.startTime} ~ {timeObject.endTime}
                </Text>
              </FlexContainer>
            </BorderBox>
          </label>
        ))}
      </FlexContainer>
    </>
  );
};
export default DailyTimeSelectForm;
