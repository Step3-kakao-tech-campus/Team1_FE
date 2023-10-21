import React, { useState, useEffect } from 'react';
import { SelectedSchedule, getApplyForm, putApply } from 'apis/alba/apply';
import { useAtom, useSetAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { applyStepAtom, weeklySelectAtom } from 'pages/alba/ApplyPage';
import { TimeData } from 'apis/admin/application';

const useApply = (startWeekDate: string) => {
  /* -------- 1. 공통 (데이터 불러오기) ------- */

  const query = useQuery(['getApplyForm', startWeekDate], () => getApplyForm({ startWeekDate: startWeekDate }), {
    suspense: true,
  });

  const [weeklySelect, setWeeklySelect] = useAtom(weeklySelectAtom);
  const [template, setTemplate] = useState<{ [index: number]: TimeData }>();

  useEffect(() => {
    if (query.data === undefined) return;
    setWeeklySelect(query.data.selected);
    setTemplate(query.data.templates);
  }, [query.data]);

  // workTimeID로 해당 시간대의 정보 찾기
  const findTimeData = (workTimeId: number): TimeData => {
    if (template === undefined) {
      return { title: '', startTime: '', endTime: '' };
    }
    return template[workTimeId];
  };

  /* ------- 2. 시간 선택 섹션 ------- */

  // 시간 체크 입력값 반영
  const selectHandler = (timeObject: SelectedSchedule, timeIndex: number, nowDay: number) => {
    const newDaily = weeklySelect[nowDay].map((selected: SelectedSchedule, i) =>
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

  return { weeklySelect, findTimeData, selectHandler, previewHandler, putSaveHandler, setStep };
};

export default useApply;
