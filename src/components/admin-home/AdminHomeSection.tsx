import { useQuery } from '@tanstack/react-query';
import { getGroupMemberList } from 'apis/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import Calendar from 'components/@commons/calendar/Calendar';
import React from 'react';

const AdminHomeSection = (): JSX.Element => {
  const { data: obj } = useQuery(['getGroupMembers'], getGroupMemberList);

  return (
    <FlexContainer>
      {obj?.data.members.length > 0 ? <Calendar /> : <div>그룹에 직원이 없습니다 초대하기 버튼</div>}
    </FlexContainer>
  );
};

export default AdminHomeSection;
