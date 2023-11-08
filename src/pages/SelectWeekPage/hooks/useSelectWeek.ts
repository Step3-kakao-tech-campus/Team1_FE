import { WeekStatusData } from 'apis/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedWeekAtom, weekStatusMonthAtom } from 'pages/SelectWeekPage/states';
import React from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const useSelectWeek = () => {
  const isAdmin = loginDatahandlers.getLoginData().isAdmin;
  const setSelectedWeek = useSetAtom(selectedWeekAtom);

  const weekOnClickHandler = (weekObj: WeekStatusData) => {
    if (!isAdmin && weekObj.weekStatus !== 'inProgress') return;
    const newObj = { startWeekDate: weekObj.dates[0], weekStatus: weekObj.weekStatus };
    setSelectedWeek(newObj);
  };

  const nowMonth = useAtomValue(weekStatusMonthAtom);
  const { year, month } = nowMonth;

  // 선택 주 초기화
  React.useEffect(() => {
    setSelectedWeek({ startWeekDate: '', weekStatus: '' });
  }, [year, month]);

  return { weekOnClickHandler };
};

export default useSelectWeek;
