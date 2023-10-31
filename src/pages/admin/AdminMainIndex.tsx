import React from 'react';
import { AdminNoGroupPage, AdminNoMemberPage } from 'pages/admin/ETCMainPage';
import SchedulePage from 'pages/SchedulePage';
import useGetMyInfo from 'hooks/useGetMyInfo';

const AdminMainIndex = (): JSX.Element => {
  const { hasGroup, hasMember, members } = useGetMyInfo();

  return (
    <>
      {!hasGroup && <AdminNoGroupPage />}
      {hasGroup && !hasMember && <AdminNoMemberPage />}
      {hasGroup && hasMember && <SchedulePage members={members} />}
    </>
  );
};

export default AdminMainIndex;
