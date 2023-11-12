import React from 'react';
import { useSetAtom } from 'jotai';
import { weeklySelectAtom } from 'pages/alba/ApplyPage/states';

const useSelectTime = () => {
  // 시간 체크 입력값 반영
  const setWeeklySelect = useSetAtom(weeklySelectAtom);
  const selectTimeHandler = (timeIndex: number, nowDay: number) => {
    setWeeklySelect((prevWeekly) => {
      // 해당 요일의 타임 배열 업데이트
      const newDaily = [...prevWeekly[nowDay]];
      newDaily[timeIndex] = { ...newDaily[timeIndex], isChecked: !newDaily[timeIndex].isChecked };

      // 해당 주차의 요일 배열 업데이트
      const newWeekly = [...prevWeekly];
      newWeekly[nowDay] = newDaily;
      return newWeekly;
    });
  };

  return {
    selectTimeHandler,
  };
};

export default useSelectTime;
