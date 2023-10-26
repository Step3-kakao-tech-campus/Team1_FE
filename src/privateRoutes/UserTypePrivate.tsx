import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { convertPath } from 'apis/convertURI';
import { getLoginData } from 'utils/loginDatahandlers';

const UserTypePrivate = ({ when }: { when: 'admin' | 'alba' }): JSX.Element => {
  const loginState = getLoginData();

  const isLogin: boolean = loginState.isLogin;
  const isAdmin: boolean = loginState.isAdmin;
  const correctType: boolean = (when === 'admin' && isAdmin) || (when === 'alba' && !isAdmin);

  return <>{isLogin && correctType ? <Outlet /> : <Navigate to={convertPath('/')} />}</>;
};

export default UserTypePrivate;
