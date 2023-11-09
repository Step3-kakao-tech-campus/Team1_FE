import { InputPeople } from 'components/PageStyledComponents/admin/ApplicationOpenPage';
import { usePeopleValidation } from 'pages/admin/ApplicationOpenPage/hooks/usePeopleValidation';

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
