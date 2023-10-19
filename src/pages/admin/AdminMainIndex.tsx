import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MemberData, getMyInfo } from 'apis/userInfo';
import { AdminNoGroupPage, AdminNoMemberPage } from 'pages/admin/ETCMainPage';
import SchedulePage from 'pages/SchedulePage';

const AdminMainIndex = (): JSX.Element => {
  const { data: membersData } = useQuery(['getMyInfo'], getMyInfo, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;
  const hasMember = membersData && membersData.data.members.length > 1;

  return (
    <>
      {!hasGroup && <AdminNoGroupPage />}
      {hasGroup && !hasMember && <AdminNoMemberPage />}
      {hasGroup && hasMember && <SchedulePage members={membersData?.data.members as MemberData[]} />}
    </>
  );
};

export default AdminMainIndex;
