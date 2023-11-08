import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { dateAtom, monthAtom } from 'pages/SchedulePage/states';

const useSchedule = () => {
  const { year, month } = useAtomValue(monthAtom);

  const setSelectedDate = useSetAtom(dateAtom);
  const dateOnClick = (isFixed: boolean, date: string) => {
    setSelectedDate({ date: date, isFixed: isFixed });
  };

  React.useEffect(() => {
    setSelectedDate({ date: '', isFixed: false });
  }, [year, month]);

  return { dateOnClick };
};

export default useSchedule;
