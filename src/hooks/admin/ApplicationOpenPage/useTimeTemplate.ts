import { useQuery } from '@tanstack/react-query';
import { getTimeTemplate } from 'apis/adminApplication';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage';
import React, { useEffect } from 'react';
import weekdayArray from 'utils/weekdayArray';

const useTimeTemplate = (startWeekDate: string) => {
  /* 1. 초기 설정 */

  // 전역 상태 선언
  const [timeTemplate, setTimeTemplate] = useAtom(timeTemplateAtom);
  const setWeeklyData = useSetAtom(weeklyPeopleAtom);

  // 이미 불러온 템플릿이 없을 때 : 서버에서 기본템플릿 불러오기
  const { data: templateRes } = useQuery(
    ['getTimeTemplate', startWeekDate],
    () => getTimeTemplate({ startWeekDate: startWeekDate }),
    { suspense: true, enabled: timeTemplate.length === 0 },
  );

  // 응답 값을 전역상태에 적용 (템플릿 / 인원수)
  useEffect(() => {
    if (timeTemplate.length === 0) {
      setTimeTemplate(templateRes?.template);
      setWeeklyData(weekdayArray.map(() => templateRes?.template.map(() => 0)));
    }
  }, [templateRes]);

  /* 2. 업데이트 */

  // 시간대 이름/시간 변경 (입력 값 반영)
  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, timeIndex: number): void => {
    setTimeTemplate((prev) =>
      prev.map((object, index) => (timeIndex !== index ? object : { ...object, [e.target.id]: e.target.value })),
    );
  };

  // 시간대 삭제
  const deleteHandler = (i: number) => {
    setTimeTemplate((prev) => prev.filter((e, index) => i !== index));
    setWeeklyData((prev) => {
      return prev.map((daily) => daily.filter((amount, index) => i !== index));
    });
  };

  // 시간대 추가
  const addHandler = () => {
    setTimeTemplate((prev) => [...prev, { title: '', startTime: '00:00', endTime: '00:00' }]);
    setWeeklyData((prev) => prev.map((dailyArr) => [...dailyArr, 0]));
  };

  /* 3. 다음 단계로 넘어가기 : 데이터 저장 */

  const [, setStep] = useAtom(openStepAtom);
  const submitHandler = () => {
    const removeEmptyTime = timeTemplate.filter((e) => e.title.length > 0);
    if (removeEmptyTime.length === 0) return;
    setTimeTemplate(removeEmptyTime);
    setStep(2);
  };

  return { timeTemplate, formChangeHandler, deleteHandler, addHandler, submitHandler };
};

export default useTimeTemplate;
