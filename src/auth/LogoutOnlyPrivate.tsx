import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import useLogin from 'hooks/useLogin';

const LogoutOnlyPrivate = (): JSX.Element => {
  const loginState = useLogin().getLoginState();
  return loginState.isLogin ? <Navigate to={convertPath('/')} /> : <Outlet />;
};

export default LogoutOnlyPrivate;
