import { useQuery } from '@tanstack/react-query';
import { getTimeTemplate } from 'apis/admin/application/open';
import { useAtom, useSetAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage/states';
import React from 'react';
import weekdayArray from 'utils/weekdayArray';

const useTimeTemplate = (startWeekDate: string) => {
  /* 1. 초기 설정 */

  // 전역 상태 선언
  const [timeTemplate, setTimeTemplate] = useAtom(timeTemplateAtom);
  const setWeeklyData = useSetAtom(weeklyPeopleAtom);

  // 이미 불러온 템플릿이 없을 때 : 서버에서 기본템플릿 불러오기
  const { data } = useQuery(
    ['getTimeTemplate', startWeekDate],
    () => getTimeTemplate({ startWeekDate: startWeekDate }),
    {
      suspense: true,
      enabled: timeTemplate.length === 0,
      onSuccess: (data) => {
        if (timeTemplate.length === 0) {
          setTimeTemplate(data.template);
          setWeeklyData(weekdayArray.map(() => data.template.map(() => 0)));
        }
      },
    },
  );

  /* 2. 업데이트 */

  // 시간대 이름/시간 변경 (입력 값 반영)
  const updateTimeHandler = (e: React.ChangeEvent<HTMLInputElement>, timeIndex: number): void => {
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

  const setStep = useSetAtom(openStepAtom);
  const goNextHandler = () => {
    const removeEmptyTime = timeTemplate.filter((e) => e.title.length > 0);
    if (removeEmptyTime.length === 0) return;
    if (removeEmptyTime.some((e) => e.startTime === e.endTime)) {
      alert('시간을 올바르게 입력하세요');
      return;
    }

    setTimeTemplate(removeEmptyTime);
    setStep('setAmount');
  };

  return { timeTemplate, updateTimeHandler, deleteHandler, addHandler, goNextHandler };
};

export default useTimeTemplate;
