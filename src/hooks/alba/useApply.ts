import React, { useState } from 'react';
import { getApplyForm, putApply } from 'apis/alba/apply';
import { useAtom, useSetAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { applyStepAtom, weeklySelectAtom } from 'pages/alba/ApplyPage';
import { SelectedTimeData, TimeData } from 'apis/types';

const useApply = (startWeekDate: string) => {
  /* -------------- 1. 공통 (데이터 불러오기) -------------- */
  const [weeklySelect, setWeeklySelect] = useAtom(weeklySelectAtom);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery(['getApplyForm', startWeekDate], () => getApplyForm({ startWeekDate: startWeekDate }), {
    onSuccess: (data) => {
      if (data === undefined) return;
      setWeeklySelect(data.selected);
      setIsLoading(false);
    },
  });

  const findTimeData = (workTimeId: number): TimeData | null => {
    if (query.data?.templates === undefined) {
      return null;
    }
    return query.data?.templates[workTimeId];
  };

  /* -------------- 2. 시간 선택 섹션 -------------- */

  // 시간 체크 입력값 반영
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
  const nextStep = useMutation(putApply, {
    onSuccess: () => setStep('preview'),
  });
  const goPreviewHandler = () => {
    nextStep.mutate({ weekStartDate: startWeekDate, apply: weeklySelect });
  };

  // 서버에 저장
  const mutation = useMutation(putApply, {
    onSuccess: () => query.refetch(),
  });
  const putSaveHandler = (day: number) => {
    mutation.mutate({ weekStartDate: startWeekDate, apply: weeklySelect });
  };

  /* -------------- 3. 미리보기 섹션 -------------- */

  const worktimeIdProcessor = (dayIndex: number) => {
    if (isLoading) return '';
    const processed = weeklySelect[dayIndex]
      .filter((object) => object.isChecked)
      .map((object) => findTimeData(object.workTimeId)?.title);

    if (processed.length === 0) return '휴무';

    return processed.join(' | ');
  };

  return {
    weeklySelect,
    findTimeData,
    selectTimeHandler,
    goPreviewHandler,
    putSaveHandler,
    setStep,
    worktimeIdProcessor,
    isLoading,
  };
};

export default useApply;
