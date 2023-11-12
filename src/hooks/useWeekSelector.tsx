import WeekBar from 'components/WeekBar';
import { useCallback, useState } from 'react';

const useWeekSelector = (initial: number) => {
  const [day, setDay] = useState(initial);

  const selectDayHandler = useCallback(
    (i: number) => {
      setDay(i);
    },
    [day],
  );

  const WeekBarComponent = () => {
    return <WeekBar selectDayHandler={selectDayHandler} day={day} />;
  };

  return { day, selectDayHandler, WeekBarComponent };
};

export default useWeekSelector;
