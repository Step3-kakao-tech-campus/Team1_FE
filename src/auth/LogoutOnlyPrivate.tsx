import { convertPath } from 'apis/convertURI';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'states/store';

const LogoutOnlyPrivate = (): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);
  return loginState.islogin ? <Navigate to={convertPath('/')} /> : <Outlet />;
};

export default LogoutOnlyPrivate;
