import React, { Suspense, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { dateAtom, memberAtom, monthAtom } from './states';
import useLogin from 'hooks/useLogin';

import PageContainer from 'components/@commons/PageContainer';
import FlexContainer from 'components/@commons/FlexContainer';
import NotFixedDateBox from 'components/DailyWorkers/NotFixedDateBox';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import { MainTopBarCont } from 'components/PageStyledComponents/admin/MainPage';

import CalenderConents from 'pages/SchedulePage/CalendarSection/CalenderConents';
import DailyWorkers from 'pages/SchedulePage/DailyWorkerSection/DailyWorkers';
import Dropdown from 'pages/SchedulePage/HeaderSection/Dropdown';
import TotalWorkTime from 'pages/SchedulePage/HeaderSection/TotalWorkTime';
import { UserData } from 'apis/types';

const SchedulePage = ({ members }: { members: UserData[] }): JSX.Element => {
  const isAdmin = useLogin().getLoginState().isAdmin;
  const nowMonth = useAtomValue(monthAtom);

  const [nowDate, setNowDate] = useAtom(dateAtom);
  const [nowMember, setNowMember] = useAtom(memberAtom);

  useEffect(() => {
    if (!isAdmin) {
      // 알바생일 때 : 항상 {memberId: 0, isSelected: true}
      // 매니저일 때 : 직원 선택 안됐을 때 {memberId: 0, isSelected: false}
      setNowMember({ memberId: 0, name: '', isSelected: true });
    }
  }, []);

  useEffect(() => {
    setNowDate({ date: '', isFixed: false });
  }, [nowMember, nowMonth]);

  return (
    <PageContainer>
      <FlexContainer $wFull $hFull $justify="start">
        <MainTopBarCont>
          <FlexContainer $wFull $align="flex-start">
            {nowMember.isSelected && <TotalWorkTime />}
          </FlexContainer>
          <FlexContainer $hFull $wFull $position="relative">
            {isAdmin && <Dropdown members={members} />}
          </FlexContainer>
        </MainTopBarCont>

        {nowMember.isSelected && (
          <CalenderOutter monthDataAtom={monthAtom}>
            <Suspense fallback={<div>캘린더 로딩</div>}>
              <CalenderConents />
            </Suspense>
          </CalenderOutter>
        )}

        {nowDate.date !== '' &&
          (nowDate.isFixed ? (
            <Suspense fallback={<div>데일리 근무표 로딩</div>}>
              <DailyWorkers date={nowDate.date} />
            </Suspense>
          ) : (
            <NotFixedDateBox />
          ))}
      </FlexContainer>
    </PageContainer>
  );
};

export default SchedulePage;
