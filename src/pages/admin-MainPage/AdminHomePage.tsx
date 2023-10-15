import { useQuery } from '@tanstack/react-query';
import { getGroupMemberList } from 'apis/manageGroup';
import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';
import AdminNoMemberSection from './AdminNoMemberSection';
import AdminScheduleSection from './SchedulePage/AdminScheduleSection';
import PageContainer from 'components/@commons/PageContainer';

const AdminHomePage = (): JSX.Element => {
  const { data: membersData } = useQuery(['getGroupMembers'], getGroupMemberList, { suspense: true });

  return (
    <PageContainer justify="start">
      <FlexContainer $wFull>
        {membersData?.data.members.length > 0 ? (
          <AdminScheduleSection members={membersData?.data.members} />
        ) : (
          <AdminNoMemberSection />
        )}
      </FlexContainer>
    </PageContainer>
  );
};

export default AdminHomePage;
