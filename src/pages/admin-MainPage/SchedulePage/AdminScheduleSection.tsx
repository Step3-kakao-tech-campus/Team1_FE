import Dropdown from 'pages/admin-MainPage/SchedulePage/Dropdown';
import FlexContainer from 'components/@commons/FlexContainer';
import React, { Suspense } from 'react';
import DailyWorkers from 'components/@commons-feature/calendar/DailyWorkers';
import { atom, useAtomValue } from 'jotai';
import NotFixedDateBox from 'components/@commons-feature/calendar/NotFixedDateBox';
import CalenderOutter from 'components/@commons-feature/calendar/CalenderOutter';
import MonthlyInner from 'pages/admin-MainPage/SchedulePage/MonthlyInner';

interface Props {
  members: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
}

export const memberAtom = atom<MemberType>({ memberId: 0, name: '' });
export const dateAtom = atom({ date: '', isFixed: false });
export const monthAtom = atom({ year: new Date().getFullYear(), month: new Date().getMonth() });

const AdminScheduleSection = ({ members }: Props): JSX.Element => {
  const nowMember = useAtomValue(memberAtom);
  const nowDate = useAtomValue(dateAtom);

  return (
    <FlexContainer $wFull>
      <FlexContainer $direction="row" $justify="space-between" $align="center">
        <FlexContainer $align="center">
          <Dropdown<MemberType> members={members} />
        </FlexContainer>
        {nowMember.name !== '' && <div> 근무시간</div>}
      </FlexContainer>

      <CalenderOutter monthDataAtom={monthAtom}>
        <Suspense fallback={<div>캘린더 로딩</div>}>
          <MonthlyInner selectedId={nowMember.memberId} />
        </Suspense>
      </CalenderOutter>

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
