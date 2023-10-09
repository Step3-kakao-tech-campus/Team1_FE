import Dropdown from 'components/admin-MainPage/Dropdown';
import FlexContainer from 'components/@commons/FlexContainer';
import Calendar from 'components/@commons/calendar/Calendar';
import React, { Suspense } from 'react';
import DailyWorkers from 'components/@commons/calendar/DailyWorkers';
import { atom, useAtomValue } from 'jotai';

interface Props {
  members: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
}

export const memberAtom = atom<MemberType>({ memberId: 0, name: '' });
export const dateAtom = atom('');

const AdminScheduleSection = ({ members }: Props): JSX.Element => {
  const nowMember = useAtomValue(memberAtom);
  const nowDate = useAtomValue(dateAtom);

  return (
    <FlexContainer $wFull>
      <FlexContainer $direction="row" $justify="space-between" $align="center">
        <div className="flex items-center gap-4">
          <Dropdown<MemberType> members={members} />
        </div>
        {nowMember.name !== '' && <div> 근무시간</div>}
      </FlexContainer>
      <Suspense fallback={<div>캘린더 로딩</div>}>
        <Calendar selectedId={nowMember.memberId} />
      </Suspense>
      {nowDate !== '' && (
        <Suspense fallback={<div>데일리 근무표 로딩</div>}>
          <DailyWorkers date={nowDate} />
        </Suspense>
      )}
    </FlexContainer>
  );
};

export default AdminScheduleSection;
