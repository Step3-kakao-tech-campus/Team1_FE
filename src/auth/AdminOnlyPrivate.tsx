import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import useLogin from 'hooks/useLogin';

const AdminOnlyPrivate = (): JSX.Element => {
  const loginState = useLogin().getLoginState();

  const isLogin: boolean = loginState.isLogin;
  const isAdmin: boolean = loginState.isAdmin;

  console.log(isLogin, isAdmin);
  return <>{isLogin && isAdmin ? <Outlet /> : <Navigate to={convertPath('/')} />}</>;
};

export default AdminOnlyPrivate;
