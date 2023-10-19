import React, { Suspense, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { dateAtom, memberAtom, monthAtom, workTimeAtom } from './states';
import { MemberData } from 'apis/userInfo';
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

const SchedulePage = ({ members }: { members: MemberData[] }): JSX.Element => {
  const isAdmin = useLogin().getLoginState().isAdmin;

  const nowDate = useAtomValue(dateAtom);
  const totalWorkTime = useAtomValue(workTimeAtom);
  const [nowMember, setNowMember] = useAtom(memberAtom);

  useEffect(() => {
    if (!isAdmin) {
      setNowMember({ memberId: null, name: '' });
    }
  }, []);

  return (
    <PageContainer>
      <FlexContainer $wFull $hFull $justify="start">
        <MainTopBarCont>
          <FlexContainer $wFull $align="flex-start">
            {nowMember.memberId !== 0 && <TotalWorkTime totalWorkTime={totalWorkTime} />}
          </FlexContainer>
          <FlexContainer $hFull $wFull $position="relative">
            {isAdmin && <Dropdown members={members} />}
          </FlexContainer>
        </MainTopBarCont>

        {nowMember.memberId !== 0 && (
          <CalenderOutter monthDataAtom={monthAtom}>
            <Suspense fallback={<div>캘린더 로딩</div>}>
              <CalenderConents selectedId={nowMember.memberId} />
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
