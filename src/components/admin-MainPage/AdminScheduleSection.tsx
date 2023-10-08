import Dropdown from 'components/admin-MainPage/Dropdown';
import FlexContainer from 'components/@commons/FlexContainer';
import Calendar from 'components/@commons/calendar/Calendar';
import React, { Suspense, useState } from 'react';

interface Props {
  members: MemberType[];
}

interface MemberType {
  memberId: number;
  name: string;
}

const AdminScheduleSection = ({ members }: Props): JSX.Element => {
  const [selected, setSelected] = useState<MemberType | null>(null);

  return (
    <FlexContainer $wFull>
      {selected?.memberId}
      <Dropdown<MemberType> members={members} selected={selected} setSelected={setSelected} />
      <Suspense>
        <Calendar selectedId={!!selected ? selected.memberId : 0} />
      </Suspense>
    </FlexContainer>
  );
};

export default AdminScheduleSection;
