import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { isOnlyNumber } from 'utils/validators';
import { weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage';

export const usePeopleValidation = (timeIndex: number, day: number) => {
  const [weeklyAmount, setWeeklyAmount] = useAtom(weeklyPeopleAtom);
  const [val, setVal] = useState(weeklyAmount[day][timeIndex].toString());

  const peopleOnBlur = () => {
    // validation : 숫자가 아닌 값
    if (!isOnlyNumber(val)) {
      setVal(weeklyAmount[day][timeIndex].toString());
      return;
    }

    // validation : 0으로 시작
    let newValue = val;
    while (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.slice(1);
    }
    setVal(newValue);

    // 데일리 배열 새로 생성
    const dailyNew = weeklyAmount[day].map((amount, index) =>
      index === timeIndex ? Number.parseInt(newValue) : amount,
    );
    // 위클리 시간표 업데이트
    setWeeklyAmount((prev) => prev.map((dailyOrigin, dayIndex) => (dayIndex === day ? dailyNew : dailyOrigin)));
  };

  const peopleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };

  return { val, peopleOnBlur, peopleOnChange };
};
