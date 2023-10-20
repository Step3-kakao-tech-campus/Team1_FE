import React, { Suspense } from 'react';
import { putApply } from 'apis/alba/apply';
import { useAtomValue, useSetAtom } from 'jotai';
import { applyStepAtom, weeklySelectAtom } from '..';
import DailySelect from './DailySelect';
import FlexContainer from 'components/@commons/FlexContainer';
import SubmitButton from 'components/@commons/SubmitButton';
import useWeekSelector from 'hooks/useWeekSelector';
import Text from 'components/@commons/Text';
import { stringDateMove } from 'utils/stringDateMove';
import BorderBox from 'components/@commons/BorderBox';
import { useMutation } from '@tanstack/react-query';

const TimeSelectSection = ({ startWeekDate }: { startWeekDate: string }): JSX.Element => {
  const { day, WeekBarComponent } = useWeekSelector(0);
  const weeklySelect = useAtomValue(weeklySelectAtom);
  const setStep = useSetAtom(applyStepAtom);

  // 미리보기 버튼 클릭
  const mutation = useMutation(putApply, { onSuccess: () => setStep(2) });
  const previewHandler = () => {
    mutation.mutate({ weekStartDate: startWeekDate, apply: weeklySelect });
  };

  return (
    <FlexContainer $wFull $gap="40px">
      <WeekBarComponent />
      <BorderBox width="100%" border>
        <FlexContainer $padding="20px">
          <Text size="xl">{stringDateMove(startWeekDate, day)}</Text>
        </FlexContainer>
      </BorderBox>
      <Suspense>
        <FlexContainer $wFull>
          <Suspense fallback={<div>체크 항목 로딩..</div>}>
            <DailySelect day={day} startWeekDate={startWeekDate} />
          </Suspense>
        </FlexContainer>
        <SubmitButton onClick={previewHandler}>미리보기</SubmitButton>
      </Suspense>
    </FlexContainer>
  );
};
export default TimeSelectSection;
