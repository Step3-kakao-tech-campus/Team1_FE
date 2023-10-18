import FlexContainer from 'components/@commons/FlexContainer';
import React, { Suspense } from 'react';
import { atom, useAtomValue } from 'jotai';
import NotFixedDateBox from 'components/DailyWorkers/NotFixedDateBox';
import CalenderOutter from 'components/Calendar/CalenderOutter';
import CalenderConents from 'pages/admin/SchedulePage/CalendarSection/CalenderConents';
import { MainTopBarCont } from 'components/PageStyledComponents/admin/MainPage';
import DailyWorkers from './DailyWorkerSection/DailyWorkers';
import Dropdown from './HeaderSection/Dropdown';
import TotalWorkTime from './HeaderSection/TotalWorkTime';
import { TotalWorkTimeData } from 'apis/getSchedule';

interface MemberType {
  memberId: number;
  name: string;
  totalWorkTime: TotalWorkTimeData;
}

export const memberAtom = atom<MemberType>({ memberId: 0, name: '', totalWorkTime: { monthly: 0, weekly: 0 } }); // 선택된 멤버 정보
export const dateAtom = atom({ date: '', isFixed: false }); // 선택된 날짜 정보
export const monthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() }); // 선택된 달 정보

const AdminSchedulePage = ({ members }: { members: MemberType[] }): JSX.Element => {
  const nowMember = useAtomValue(memberAtom);
  const nowDate = useAtomValue(dateAtom);

  return (
    <FlexContainer $wFull $hFull $justify="start">
      <MainTopBarCont>
        <FlexContainer $wFull $align="flex-start">
          {nowMember.name !== '' && <TotalWorkTime totalWorkTime={nowMember.totalWorkTime} />}
        </FlexContainer>
        <FlexContainer $hFull $wFull $position="relative">
          <Dropdown<MemberType> members={members} />
        </FlexContainer>
      </MainTopBarCont>

      {nowMember.name !== '' && (
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
  );
};

export default AdminSchedulePage;
