import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

const PrivateRoute = () => {
  const loginState = useSelector((state: RootState) => state.login);
  return loginState.islogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
