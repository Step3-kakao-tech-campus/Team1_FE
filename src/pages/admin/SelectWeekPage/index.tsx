import React, { Suspense } from 'react';
import { atom, useAtomValue } from 'jotai';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import StatusCalendar from './Calendar/StatusCalendar';
import WeeklyDatailSection from './WeeklyDetailSection';
import FlexContainer from 'components/@commons/FlexContainer';
import PageContainer from 'components/@commons/PageContainer';
import useLogin from 'hooks/useLogin';
import SubmitButton from 'components/@commons/SubmitButton';
import { useNavigate } from 'react-router';
import { convertPath } from 'apis/convertURI';
import Text from 'components/@commons/Text';

export const weekStatusMonthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() });
export const selectedWeekAtom = atom({ startWeekDate: '', weekStatus: '' });

const SelectWeekPage = (): JSX.Element => {
  const isAdmin = useLogin().getLoginState().isAdmin;
  return (
    <PageContainer justify="start">
      <FlexContainer $wFull>
        <CalenderOutter monthDataAtom={weekStatusMonthAtom}>
          <Suspense>
            <StatusCalendar />
          </Suspense>
        </CalenderOutter>
      </FlexContainer>
      <FlexContainer $wFull>
        {isAdmin && <WeeklyDatailSection />}
        {!isAdmin && <ApplyButton />}
      </FlexContainer>
    </PageContainer>
  );
};

export default SelectWeekPage;

const ApplyButton = (): JSX.Element => {
  const navigate = useNavigate();
  const selectedWeek = useAtomValue(selectedWeekAtom);
  const submitHandler = () => {
    navigate(convertPath(`/apply/${selectedWeek.startWeekDate}`));
  };
  return (
    <>
      {selectedWeek.startWeekDate !== '' && <SubmitButton onClick={submitHandler}>신청하러가기</SubmitButton>}
      {selectedWeek.startWeekDate === '' && <Text> 주차를 선택해 주세요</Text>}
    </>
  );
};
