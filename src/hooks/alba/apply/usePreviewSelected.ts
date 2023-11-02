import React from 'react';
import { useAtomValue } from 'jotai';
import { weeklySelectAtom } from 'pages/alba/ApplyPage/states';
import { usePutApplyForm } from './fetch';
import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import usePopUpPage from 'hooks/usePopUpPage';

const usePreviewSelected = (startWeekDate: string) => {
  const weeklySelect = useAtomValue(weeklySelectAtom);
  const { popUpOffHandler } = usePopUpPage();

  // 체크한 시간대만 문자열로 표시
  const checkedTimeOnly = (dayIndex: number) => {
    const processed = weeklySelect[dayIndex].filter((object) => object.isChecked).map((object) => object.title);
    if (processed.length === 0) return '휴무';
    return processed.join(' | ');
  };

  const navigate = useNavigate();
  const postOnSuccess = () => {
    navigate(convertPath('/'));
    popUpOffHandler();
  };
  const { mutate } = usePutApplyForm(startWeekDate, postOnSuccess);

  const goSelectHandler = () => {
    popUpOffHandler();
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
