import { useQuery } from '@tanstack/react-query';
import { getMonthly } from 'apis/getSchedule';
import Dropdown from 'components/admin-home/Dropdown';
import FlexContainer from 'components/@commons/FlexContainer';
import Calendar from 'components/@commons/calendar/Calendar';
import React, { Suspense } from 'react';

interface Props {
  members: Member[];
}

interface Member {
  memberId: number;
  name: string;
  isAdmin: boolean;
}

const AdminScheduleSection = ({ members }: Props): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const { data: obj } = useQuery(['getMonthly', month, year], () => getMonthly(year, month, 1), { suspense: true });

  return (
    <FlexContainer $wFull>
      <Dropdown members={members} />
      <Suspense>{obj && <Calendar table={obj.table} month={month} />}</Suspense>
    </FlexContainer>
  );
};

export default AdminScheduleSection;
