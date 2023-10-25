import React, { Suspense, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { dateAtom, memberAtom, monthAtom } from './states';
import useLogin from 'hooks/useLogin';

import PageContainer from 'components/@commons/PageContainer';
import FlexContainer from 'components/@commons/FlexContainer';
import NotFixedDateBox from 'components/DailyWorkers/NotFixedDateBox';
import CalenderOutter from 'components/Calendar/CalenderOutter';

import CalenderConents from 'pages/SchedulePage/CalendarSection/CalenderConents';
import DailyWorkers from 'pages/SchedulePage/DailyWorkerSection/DailyWorkers';
import Dropdown from 'pages/SchedulePage/HeaderSection/Dropdown';
import TotalWorkTime from 'pages/SchedulePage/HeaderSection/TotalWorkTime';
import { UserData } from 'apis/types';
import SubmitButton from 'components/@commons/SubmitButton';
import Loader from 'components/Suspenses/Loader';
import Skeleton from 'components/Suspenses/Skeleton';

const SchedulePage = ({ members }: { members: UserData[] }): JSX.Element => {
  const isAdmin = useLogin().getLoginState().isAdmin;
  const nowMonth = useAtomValue(monthAtom);

  const [nowDate, setNowDate] = useAtom(dateAtom);
  const [nowMember, setNowMember] = useAtom(memberAtom);

  useEffect(() => {
    if (!isAdmin) {
      // 알바생일 때 : 항상 {userId: 0, isSelected: true}
      // 매니저일 때 : 직원 선택 안됐을 때 {userId: 0, isSelected: false}
      setNowMember({ userId: 0, name: '', isSelected: true });
    }
  }, []);

  useEffect(() => {
    setNowDate({ date: '', isFixed: false });
  }, [nowMember, nowMonth]);

  return (
    <PageContainer justify="start">
      <FlexContainer $direction="row" $wFull $justify="start">
        <FlexContainer $wFull $align="flex-start">
          {nowMember.isSelected && <TotalWorkTime />}
        </FlexContainer>
        <FlexContainer $hFull $wFull $position="relative">
          {isAdmin && <Dropdown members={members} />}
        </FlexContainer>
      </FlexContainer>

      {nowMember.isSelected && (
        <FlexContainer $wFull>
          <CalenderOutter monthDataAtom={monthAtom} />
          <Suspense fallback={<Skeleton aspectRatio="1.12" isDeffered />}>
            <CalenderConents />
          </Suspense>
        </FlexContainer>
      )}

      {nowDate.date !== '' &&
        (nowDate.isFixed ? (
          <FlexContainer $wFull>
            <Suspense fallback={<Loader />}>
              <DailyWorkers date={nowDate.date} />
              {!isAdmin && <SubmitButton>대타를 구하고 싶어요</SubmitButton>}
            </Suspense>
          </FlexContainer>
        ) : (
          <NotFixedDateBox />
        ))}
    </PageContainer>
  );
};

export default SchedulePage;
