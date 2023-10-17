import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGroupMemberList } from 'apis/manageGroup';
import AdminNoMemberSection from './AdminNoMemberSection';
import AdminScheduleSection from './SchedulePage/AdminScheduleSection';
import PageContainer from 'components/@commons/PageContainer';
import AdminNoGroupSection from './AdminNoGroupSection';

const AdminHomePage = (): JSX.Element => {
  const { data: membersData } = useQuery(['getGroupMembers'], getGroupMemberList, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;
  const hasMember = membersData?.data.members.length > 1;

  return (
    <PageContainer withoutBottonBar={!hasGroup || !hasMember}>
      {!hasGroup && <AdminNoGroupSection />}
      {hasGroup && !hasMember && <AdminNoMemberSection />}
      {hasGroup && hasMember && <AdminScheduleSection members={membersData?.data.members} />}
    </PageContainer>
  );
};

export default AdminHomePage;
