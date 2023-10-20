import React, { useEffect } from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import Text from 'components/@commons/Text';
import { SelectedSchedule, putApply } from 'apis/alba/apply';
import CheckBox from 'components/@commons/CheckBox';
import { TimeData } from 'apis/admin/application';
import { useAtom } from 'jotai';
import { weeklySelectAtom } from '..';
import useApply from 'hooks/alba/useApply';
import { useMutation } from '@tanstack/react-query';

interface Props {
  day: number;
  startWeekDate: string;
}

const DailySelect = ({ day, startWeekDate }: Props): JSX.Element => {
  const { query, findTimeData } = useApply(startWeekDate);

  const [weeklySelect, setWeeklySelect] = useAtom(weeklySelectAtom);

  // 체크 시간 업데이트
  const selectHandler = (timeObject: SelectedSchedule, timeIndex: number) => {
    const newDaily = weeklySelect[day].map((selected: SelectedSchedule, i) =>
      i === timeIndex ? { ...timeObject, isChecked: !timeObject.isChecked } : selected,
    );
    setWeeklySelect((prevWeekly) => prevWeekly.map((prevDaily, dayIndex) => (dayIndex === day ? newDaily : prevDaily)));
  };

  // 요일 바뀔 때 마다 서버에 저장
  const mutation = useMutation(putApply, { onSuccess: () => query.refetch() });
  useEffect(() => {
    mutation.mutate({ weekStartDate: startWeekDate, apply: weeklySelect });
  }, [day]);

  return (
    <>
      {weeklySelect[day].map((timeObject: SelectedSchedule, timeIndex) => (
        <label key={timeObject.workTimeId}>
          <BorderBox width="100%" gradation={true}>
            <FlexContainer $wFull $padding="28px" $direction="row" $align="center">
              <CheckBox
                type="checkbox"
                onClick={() => selectHandler(timeObject, timeIndex)}
                checked={timeObject.isChecked}
                readOnly
              />
              <Text size="xl" margin="0">
                {findTimeData(timeObject.workTimeId).title}
              </Text>
              <Text size="xl" margin="0 0 0 auto">
                {findTimeData(timeObject.workTimeId).startTime} ~ {findTimeData(timeObject.workTimeId).endTime}
              </Text>
            </FlexContainer>
          </BorderBox>
        </label>
      ))}
    </>
  );
};
export default DailySelect;
