import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { getLoginData } from 'utils/loginDatahandlers';

const LogoutOnlyPrivate = (): JSX.Element => {
  const loginState = getLoginData();

  return loginState.isLogin ? <Navigate to={convertPath('/')} /> : <Outlet />;
};

export default LogoutOnlyPrivate;
