import { useQuery } from '@tanstack/react-query';
import { getGroupMemberList } from 'apis/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';
import AdminNoMemberSection from './AdminNoMemberSection';
import AdminScheduleSection from './AdminScheduleSection';
import PageContainer from 'components/@commons/PageContainer';

const AdminHomePage = (): JSX.Element => {
  const { data: obj } = useQuery(['getGroupMembersabcd'], getGroupMemberList, { suspense: true });
  console.log(obj);
  return (
    <PageContainer justify="start">
      <FlexContainer $wFull>
        {obj?.data.members.length > 0 ? <AdminScheduleSection members={obj?.data.members} /> : <AdminNoMemberSection />}
      </FlexContainer>
    </PageContainer>
  );
};

export default AdminHomePage;
