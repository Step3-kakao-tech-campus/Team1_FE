import HeaderNB from 'components/organisms/HeaderNB';
import LoginOrSignup from 'components/organisms/LoginOrSignup';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';

interface Component {}

const MainPage = ({}: Component): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);

  return loginState.islogin ? (
    <HeaderNB />
  ) : (
    <div>
      <LoginOrSignup />
    </div>
  );
};

export default MainPage;
