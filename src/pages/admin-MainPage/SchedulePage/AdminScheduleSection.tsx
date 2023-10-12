import Dropdown from 'pages/admin-MainPage/SchedulePage/Dropdown';
import FlexContainer from 'components/@commons/FlexContainer';
import React, { Suspense } from 'react';
import DailyWorkersTemplate from 'components/@commons-feature/calendar/DailyWorkersTemplate';
import { atom, useAtomValue } from 'jotai';
import NotFixedDateBox from 'components/@commons-feature/calendar/NotFixedDateBox';
import CalenderOutter from 'components/@commons-feature/calendar/CalenderOutter';
import FixedMonthlyConents from 'pages/admin-MainPage/SchedulePage/FixedMonthlyConents';
import { useQuery } from '@tanstack/react-query';
import { getDailyWorkers } from 'apis/getSchedule';
import styled from 'styled-components';
import TotalWorkTime from './TotalWorkTime';

interface Props {
  members: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
  totalWorkTime: { monthly: number; weekly: number };
}

export const memberAtom = atom<MemberType>({ memberId: 0, name: '', totalWorkTime: { monthly: 0, weekly: 0 } }); // 선택된 멤버 정보
export const dateAtom = atom({ date: '', isFixed: false }); // 선택된 날짜 정보
export const monthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() }); // 선택된 달 정보

const AdminScheduleSection = ({ members }: Props): JSX.Element => {
  const nowMember = useAtomValue(memberAtom);
  const nowDate = useAtomValue(dateAtom);

  return (
    <FlexContainer $wFull>
      <MainTopBarCont>
        <FlexContainer $wFull $align="flex-start">
          {nowMember.name !== '' && <TotalWorkTime totalWorkTime={nowMember.totalWorkTime} />}
        </FlexContainer>
        <Dropdown<MemberType> members={members} />
      </MainTopBarCont>

      {nowMember.name !== '' && (
        <CalenderOutter monthDataAtom={monthAtom}>
          <Suspense fallback={<div>캘린더 로딩</div>}>
            <FixedMonthlyConents selectedId={nowMember.memberId} />
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
  );
};

export default AdminScheduleSection;

const DailyWorkers = ({ date }: { date: string }): JSX.Element => {
  const { data: scheduleResponse } = useQuery([date], () => getDailyWorkers({ date: date }), {
    suspense: true,
  });
  return (
    <FlexContainer $wFull>
      {scheduleResponse && <DailyWorkersTemplate dailyData={scheduleResponse?.data.schedule} />}
    </FlexContainer>
  );
};

const MainTopBarCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 60px;
`;
