import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { useAtomValue } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';

const useWeeklyDetail = () => {
  const startWeekDate = useAtomValue(selectedWeekAtom).startWeekDate;
  const navigate = useNavigate();

  const openHandler = () => {
    navigate(convertPath('/newSchedule/open'), { state: { startWeekDate: startWeekDate } });
  };

  const closeHandler = () => {
    navigate(convertPath('/newSchedule/close'), { state: { startWeekDate: startWeekDate } });
  };

  const albaBtnHandler = () => {
    navigate(convertPath('/apply/selectTimes'), { state: { startWeekDate: startWeekDate } });
  };

  return { openHandler, closeHandler, albaBtnHandler };
};

export default useWeeklyDetail;
