import React, { useEffect, useState } from 'react';
import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import Text from 'components/@commons/Text';

import { useQuery } from '@tanstack/react-query';
import { SelectedSchedule, TimeTemplateData, getApplyForm } from 'apis/alba/apply';
import CheckBox from 'components/@commons/CheckBox';

const TimeSelectSection = ({ startWeekDate, day }: { startWeekDate: string; day: number }): JSX.Element => {
  const { data: applyFormRes } = useQuery(
    ['getApplyForm', startWeekDate],
    () => getApplyForm({ startWeekDate: startWeekDate }),
    {
      suspense: true,
    },
  );

  const [selectedState, setSelectedState] = useState<SelectedSchedule[][]>();

  useEffect(() => {
    setSelectedState(applyFormRes?.data.selected);
  }, [applyFormRes?.data.selected]);

  const isCheckedValue = (workTimeId: number) => {
    if (selectedState === undefined) return false;

    const time = selectedState[day].find((e, i) => e.workTimeId === workTimeId);
    return time?.isChecked;
  };

  const selectHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedState === undefined) return;

    const id = Number.parseInt(event.currentTarget.id);
    const newDaily = selectedState[day].map((time: SelectedSchedule) =>
      time.workTimeId === id ? { ...time, isChecked: !time['isChecked'] } : time,
    );
    setSelectedState(
      (prevWeekly) => prevWeekly?.map((daily: SelectedSchedule[], dayIndex) => (dayIndex === day ? newDaily : daily)),
    );
  };

  return (
    <FlexContainer $wFull>
      {applyFormRes?.data.template.map((timeData: TimeTemplateData, i) => (
        <BorderBox width="100%" gradation={true} key={timeData.workTimeId}>
          <FlexContainer $wFull $padding="20px" $direction="row" id={timeData.workTimeId} onClick={selectHandler}>
            <CheckBox type="checkbox" checked={isCheckedValue(timeData.workTimeId)} readOnly />
            <Text size="xl" margin="0">
              {timeData.title}
            </Text>
            <Text margin="0 0 0 auto">
              {timeData.startTime} ~ {timeData.endTime}
            </Text>
          </FlexContainer>
        </BorderBox>
      ))}
    </FlexContainer>
  );
};

export default TimeSelectSection;
