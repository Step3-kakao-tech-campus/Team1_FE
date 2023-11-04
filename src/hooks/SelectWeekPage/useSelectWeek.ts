import { WeekStatusData, WeekStatusTypes } from 'apis/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedWeekAtom, weekStatusMonthAtom } from 'pages/SelectWeekPage/states';
import React from 'react';
import { getLoginData } from 'utils/loginDatahandlers';

const useSelectWeek = () => {
  const isAdmin = getLoginData().isAdmin;
  const setSelectedWeek = useSetAtom(selectedWeekAtom);

  const weekOnClickHandler = (weekObj: WeekStatusData) => {
    if (!isAdmin && weekObj.weekStatus !== 'inProgress') return;
    const newObj = { startWeekDate: weekObj.dates[0], weekStatus: weekObj.weekStatus };
    setSelectedWeek(newObj);
  };

  const statusConverter = (weekStatus: WeekStatusTypes) => {
    switch (weekStatus) {
      case 'allocatable':
        return '모집 전';
      case 'inProgress':
        return '모집 중';
      case 'closed':
        return '모집 마감';
    }
  };

  const nowMonth = useAtomValue(weekStatusMonthAtom);
  const { year, month } = nowMonth;

  // 선택 주 초기화
  React.useEffect(() => {
    setSelectedWeek({ startWeekDate: '', weekStatus: '' });
  }, [year, month]);

  return { weekOnClickHandler, statusConverter };
};

export default useSelectWeek;
