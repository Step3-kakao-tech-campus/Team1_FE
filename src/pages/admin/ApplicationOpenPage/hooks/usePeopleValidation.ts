import React from 'react';
import { useAtom } from 'jotai';
import { isOnlyNumber } from 'utils/validators';
import { weeklyPeopleAtom } from 'pages/admin/ApplicationOpenPage/states';
import useFormOnBlurUpdate from 'hooks/useFormOnBlurUpdate';

export const usePeopleValidation = (timeIndex: number, day: number) => {
  const [weeklyAmount, setWeeklyAmount] = useAtom(weeklyPeopleAtom);

  const validator = (prev: string) => {
    // validation : 숫자가 아닌 값
    if (!isOnlyNumber(prev)) {
      return weeklyAmount[day][timeIndex].toString();
    }

    let newValue = prev;
    // validation : 0으로 시작
    while (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.slice(1);
    }
    return newValue;
  };

  const afterBlurUpdater = (eventValue: string) => {
    // 데일리 배열 새로 생성
    const dailyNew = weeklyAmount[day].map((amount, index) =>
      index === timeIndex ? Number.parseInt(validator(eventValue)) : amount,
    );
    // 위클리 시간표 업데이트
    setWeeklyAmount((prev) => prev.map((dailyOrigin, dayIndex) => (dayIndex === day ? dailyNew : dailyOrigin)));
  };

  const { val, onBlurHandler, onChangeHandler } = useFormOnBlurUpdate(
    { [timeIndex]: weeklyAmount[day][timeIndex].toString() },
    afterBlurUpdater,
    validator,
  );
  return {
    val,
    onBlurHandler,
    onChangeHandler,
  };
};
