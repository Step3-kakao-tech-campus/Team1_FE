import { useNavigate } from 'react-router';
import { convertPath } from 'apis/convertURI';
import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import React from 'react';
import { useAtomValue } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage';

const AlbaSubmitButton = (): JSX.Element => {
  const navigate = useNavigate();
  const selectedWeek = useAtomValue(selectedWeekAtom);
  const submitHandler = () => {
    navigate(convertPath('/apply/selectTimes'), { state: { startWeekDate: selectedWeek.startWeekDate } });
  };
  return (
    <>
      {selectedWeek.startWeekDate !== '' && <SubmitButton onClick={submitHandler}>신청하러가기</SubmitButton>}
      {selectedWeek.startWeekDate === '' && <Text> 주차를 선택해 주세요</Text>}
    </>
  );
};

export default AlbaSubmitButton;
