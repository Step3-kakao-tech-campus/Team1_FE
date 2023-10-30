import React from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { applyStepAtom, weeklySelectAtom } from 'pages/alba/ApplyPage';
import { SelectedTimeData } from 'apis/types';

const useSelectTime = () => {
  // 시간 체크 입력값 반영
  const [weeklySelect, setWeeklySelect] = useAtom(weeklySelectAtom);
  const selectTimeHandler = (timeObject: SelectedTimeData, timeIndex: number, nowDay: number) => {
    const newDaily = weeklySelect[nowDay].map((selected: SelectedTimeData, i) =>
      i === timeIndex ? { ...timeObject, isChecked: !timeObject.isChecked } : selected,
    );
    setWeeklySelect((prevWeekly) =>
      prevWeekly.map((prevDaily, dayIndex) => (dayIndex === nowDay ? newDaily : prevDaily)),
    );
  };

  // 미리보기 버튼 클릭
  const setStep = useSetAtom(applyStepAtom);
  const goPreviewHandler = () => {
    setStep('preview');
  };

  return {
    selectTimeHandler,
    goPreviewHandler,
  };
};

export default useSelectTime;
