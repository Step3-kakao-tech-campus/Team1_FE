import React from 'react';
import { InputPeople } from 'components/PageStyledComponents/admin/ApplicationOpenPage';
import { usePeopleValidation } from 'hooks/admin/ApplicationOpenPage/usePeopleValidation';

const EditAmountForm = ({ timeIndex, day }: { timeIndex: number; day: number }): JSX.Element => {
  const { val, onBlurHandler, onChangeHandler } = usePeopleValidation(timeIndex, day);

  return (
    <InputPeople
      type="number"
      min="0"
      id={`${timeIndex}`}
      value={val[`${timeIndex}`]}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
    />
  );
};
export default EditAmountForm;
