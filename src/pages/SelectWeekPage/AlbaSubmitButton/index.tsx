import SubmitButton from 'components/@commons/SubmitButton';
import Text from 'components/@commons/Text';
import React from 'react';
import { useAtomValue } from 'jotai';
import { selectedWeekAtom } from 'pages/SelectWeekPage/states';
import useWeeklyDetail from 'hooks/SelectWeekPage/useWeeklyDetail';

const AlbaSubmitButton = (): JSX.Element => {
  const selectedWeek = useAtomValue(selectedWeekAtom);
  const { albaBtnHandler } = useWeeklyDetail();

  return (
    <>
      {selectedWeek.startWeekDate !== '' && <SubmitButton onClick={albaBtnHandler}>신청하러가기</SubmitButton>}
      {selectedWeek.startWeekDate === '' && <Text> 주차를 선택해 주세요</Text>}
    </>
  );
};

export default AlbaSubmitButton;
