import React, { useState } from 'react';
import { getApplyForm, putApply } from 'apis/alba/apply';
import { useAtom, useSetAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { applyStepAtom, weeklySelectAtom } from 'pages/alba/ApplyPage';
import { SelectedTimeData, TimeData } from 'apis/types';

const useApply = (startWeekDate: string) => {
  /* -------------- 1. 공통 (데이터 불러오기) -------------- */
  const [weeklySelect, setWeeklySelect] = useAtom(weeklySelectAtom);
  const [template, setTemplate] = useState<{ [index: number]: TimeData }>();

  const query = useQuery(['getApplyForm', startWeekDate], () => getApplyForm({ startWeekDate: startWeekDate }), {
    suspense: true,
    onSuccess: (data) => {
      if (data === undefined) return;
      setWeeklySelect(data.selected);
      setTemplate(data.templates);
    },
  });

  // workTimeID로 해당 시간대의 정보 찾기
  const findTimeData = (workTimeId: number): TimeData => {
    if (template === undefined) {
      return { title: '', startTime: '', endTime: '' };
    }
    return template[workTimeId];
  };

  /* -------------- 2. 시간 선택 섹션 -------------- */

  // 시간 체크 입력값 반영
  const selectHandler = (timeObject: SelectedTimeData, timeIndex: number, nowDay: number) => {
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
    onSuccess: () => setStep(2),
  });
  const previewHandler = () => {
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
    const processed = weeklySelect[dayIndex]
      .filter((object) => object.isChecked)
      .map((object) => findTimeData(object.workTimeId).title);

    if (processed.length === 0) return '휴무';

    return processed.join(' | ');
  };

  return {
    weeklySelect,
    findTimeData,
    selectHandler,
    previewHandler,
    putSaveHandler,
    setStep,
    worktimeIdProcessor,
  };
};

export default useApply;
