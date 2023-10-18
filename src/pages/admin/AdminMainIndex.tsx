import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/userInfo';

import AdminSchedulePage from 'pages/admin/SchedulePage';
import { AdminNoGroupPage, AdminNoMemberPage } from 'pages/admin/ETCMainPage';

const AdminMainIndex = (): JSX.Element => {
  const { data: membersData } = useQuery(['getMyInfo'], getMyInfo, { suspense: true });
  const hasGroup = membersData?.data.groupName !== null;
  const hasMember = membersData?.data.members.length > 1;

  return (
    <>
      {!hasGroup && <AdminNoGroupPage />}
      {hasGroup && !hasMember && <AdminNoMemberPage />}
      {hasGroup && hasMember && <AdminSchedulePage members={membersData?.data.members} />}
    </>
  );
};

export default AdminMainIndex;
