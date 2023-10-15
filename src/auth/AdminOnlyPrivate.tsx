import { convertPath } from 'apis/convertURI';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'states/store';

const AdminOnlyPrivate = (): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);
  const isLogin: boolean = loginState.islogin;
  const isAdmin: boolean = loginState.userData.isAdmin;

  return <>{isLogin && isAdmin ? <Outlet /> : <Navigate to={convertPath('/')} />}</>;
};

export default AdminOnlyPrivate;
