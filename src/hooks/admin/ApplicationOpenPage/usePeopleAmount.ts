import React from 'react';
import { useAtom } from 'jotai';
import { openStepAtom, timeTemplateAtom, weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage';
import { postOpenApplication } from 'apis/admin/application/open';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';

const usePeopleAmount = (startWeekDate: string) => {
  // 전역 상태 가져오기 (주간 인원수 배열)
  const [weeklyAmount, setWeeklyAmount] = useAtom(weeklyPeopleAtom);

  // 이전 단계로 넘어가기
  const [, setStep] = useAtom(openStepAtom);
  const goPrevHandler = () => {
    setStep(1);
  };

  // 서버에 저장 (모집 시작 요청)
  const navigate = useNavigate();
  const [timeTemplate, setTimeTemplate] = useAtom(timeTemplateAtom);
  const submitHandler = () => {
    postOpenApplication({
      weeklyAmount: weeklyAmount,
      timeTemplate: timeTemplate,
      startWeekDate: startWeekDate,
    }).then((res) => {
      navigate(convertPath('/'));

      setWeeklyAmount([[], [], [], [], [], [], []]);
      setStep(1);
      setTimeTemplate([]);
    });
  };

  return {
    timeTemplate,
    submitHandler,
    goPrevHandler,
    weeklyAmount,
  };
};

export default usePeopleAmount;
