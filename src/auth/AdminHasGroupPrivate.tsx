import { convertPath } from 'apis/convertURI';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'states/store';

const AdminHasGroupPrivate = (): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);
  const hasGroup: boolean = loginState.userData?.groupName.length > 0;

  return <>{hasGroup ? <Outlet /> : <Navigate to={convertPath('/')} />}</>;
};

export default AdminHasGroupPrivate;
