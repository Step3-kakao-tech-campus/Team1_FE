import Dropdown from 'pages/admin-MainPage/Dropdown';
import FlexContainer from 'components/@commons/FlexContainer';
import Calendar from 'components/@commons-feature/calendar/Calendar';
import React, { Suspense } from 'react';
import DailyWorkers from 'components/@commons-feature/calendar/DailyWorkers';
import { atom, useAtomValue } from 'jotai';
import NotFixedDateBox from 'components/@commons-feature/calendar/NotFixedDateBox';

interface Props {
  members: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
}

export const memberAtom = atom<MemberType>({ memberId: 0, name: '' });
export const dateAtom = atom({ date: '', isFixed: false });

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
