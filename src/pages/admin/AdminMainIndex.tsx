import React from 'react';
import { AdminNoGroupPage, AdminNoMemberPage } from 'pages/admin/ETCMainPage';
import SchedulePage from 'pages/SchedulePage';
import useGetMyInfo from 'hooks/useGetMyInfo';

const AdminMainIndex = (): JSX.Element => {
  const { userType, members } = useGetMyInfo();

  switch (userType) {
    case 'ADMIN_NO_GROUP':
      return <AdminNoGroupPage />;
    case 'ADMIN_NO_MEMBER':
      return <AdminNoMemberPage />;
    case 'ADMIN':
      return <SchedulePage members={members} />;
    default:
      return <></>;
  }
};

export default AdminMainIndex;
