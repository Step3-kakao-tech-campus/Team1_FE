import useWeekSelector from 'hooks/useWeekSelector';
import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin-ApplicationOpenPage/ApplicationOpenPage';
import { postOpenApplication } from 'apis/adminApplication';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';

const usePeopleAmount = (startWeekDate: string) => {
  // 전역 상태 선언 (주간 인원수 배열)
  const [weeklyAmount, setWeeklyData] = useAtom(weeklyPeopleAtom);

  // 요일바 선언
  const { day, WeekBarComponent } = useWeekSelector(0);

  // 인원수 입력 값 반영
  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, timeIndex: number): void => {
    // 데일리 배열 새로 생성
    const dailyNew = weeklyAmount[day].map((amount, index) =>
      index === timeIndex ? Number.parseInt(event.target.value) : amount,
    );
    // 위클리 시간표 업데이트
    setWeeklyData((prev) => prev.map((dailyOrigin, dayIndex) => (dayIndex === day ? dailyNew : dailyOrigin)));
  };

  // 이전 단계로 넘어가기
  const [, setStep] = useAtom(openStepAtom);
  const goPrevHandler = () => {
    setStep(1);
  };

  // 서버에 저장 (모집 시작 요청)
  const navigate = useNavigate();
  const timeTemplate = useAtomValue(timeTemplateAtom);
  const submitHandler = () => {
    postOpenApplication({
      weeklyAmount: weeklyAmount,
      timeTemplate: timeTemplate,
      startWeekDate: startWeekDate,
    }).then((res) => {
      navigate(convertPath('/'));
    });
  };

  return { timeTemplate, submitHandler, goPrevHandler, formChangeHandler, weeklyAmount, day, WeekBarComponent };
};

export default usePeopleAmount;
