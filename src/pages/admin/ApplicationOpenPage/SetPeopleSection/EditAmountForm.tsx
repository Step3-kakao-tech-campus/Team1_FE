import React, { useState } from 'react';
import { InputPeople } from 'components/PageStyledComponents/admin/ApplicationOpenPage';
import { useAtom } from 'jotai';
import { weeklyPeopleAtom } from '..';
import { isOnlyNumber } from 'utils/validators';

const EditAmountForm = ({ timeIndex, day }: { timeIndex: number; day: number }): JSX.Element => {
  const [weeklyAmount, SetWeeklyAmount] = useAtom(weeklyPeopleAtom);
  const [val, setVal] = useState(weeklyAmount[day][timeIndex].toString());
  const onBlurHandler = () => {
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
    SetWeeklyAmount((prev) => prev.map((dailyOrigin, dayIndex) => (dayIndex === day ? dailyNew : dailyOrigin)));
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };
  return (
    <InputPeople
      type="number"
      min="0"
      id={`${timeIndex}`}
      value={val}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
    />
  );
};
export default EditAmountForm;
