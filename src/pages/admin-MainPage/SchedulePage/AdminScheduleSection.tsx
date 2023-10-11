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
      <FlexContainer $direction="row" $justify="space-between" $align="center" $gap="0" $padding="0 0 30px">
        <FlexContainer $wFull $align="flex-start">
          {nowMember.name !== '' && <div>이번달 근무시간</div>}
        </FlexContainer>
        <Dropdown<MemberType> members={members} />
      </FlexContainer>

      <CalenderOutter monthDataAtom={monthAtom}>
        <Suspense fallback={<div>캘린더 로딩</div>}>
          <FixedMonthlyConents selectedId={nowMember.memberId} />
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
