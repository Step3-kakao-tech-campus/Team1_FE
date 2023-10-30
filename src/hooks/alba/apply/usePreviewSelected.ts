import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { applyStepAtom, weeklySelectAtom } from 'pages/alba/ApplyPage';
import { usePutApplyForm } from './fetch';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';

const usePreviewSelected = (startWeekDate: string) => {
  const weeklySelect = useAtomValue(weeklySelectAtom);
  const setStep = useSetAtom(applyStepAtom);

  // 체크한 시간대만 문자열로 표시
  const checkedTimeOnly = (dayIndex: number) => {
    const processed = weeklySelect[dayIndex].filter((object) => object.isChecked).map((object) => object.title);
    if (processed.length === 0) return '휴무';
    return processed.join(' | ');
  };

  const navigate = useNavigate();
  const { mutate } = usePutApplyForm(startWeekDate, () => {
    navigate(convertPath('/'));
    setStep('checkTime');
  });

  const goSelectHandler = () => {
    setStep('checkTime');
  };
  const submitApplyHandler = () => {
    mutate();
  };

  return {
    submitApplyHandler,
    goSelectHandler,
    checkedTimeOnly,
  };
};

export default usePreviewSelected;
