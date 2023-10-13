import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderInnerBox,
  HeaderButton,
  HeaderLeftMenuGroup,
  HeaderRightMenuGroup,
} from 'components/HeaderNB/HeaderNBStyels';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';
import useLogin from 'hooks/useLogin';
import tokenValidator from 'utils/tokenValidator';
import { Alarm, Hamburger } from './icons';
import Sidebar from 'components/@commons/sidebar/Sidebar';
import { SidebarBackground, SidebarBox } from 'components/@commons/sidebar';

const HeaderNB = (): JSX.Element => {
  const loginState = useSelector((state: RootState) => state.login);
  const { logout, loginBtnHandler } = useLogin('/');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sidebarHandler = () => {
    setIsOpen(() => !isOpen);
  };

  if (loginState.islogin && !tokenValidator(loginState.token)) {
    logout();
  }
  return (
    <HeaderContainer>
      <HeaderInnerBox>
        <HeaderLeftMenuGroup>
          <button onClick={sidebarHandler}>
            <Hamburger />
          </button>
          {isOpen && (
            <SidebarBackground onClick={sidebarHandler}>
              <SidebarBox onClick={(e) => e.stopPropagation()}>
                <Sidebar />
              </SidebarBox>
            </SidebarBackground>
          )}
        </HeaderLeftMenuGroup>

        <HeaderRightMenuGroup>
          <Alarm />
          {loginState.islogin ? (
            <HeaderButton onClick={logout}>임시로그아웃</HeaderButton>
          ) : (
            <HeaderButton onClick={loginBtnHandler}>임시로그인버튼</HeaderButton>
          )}
        </HeaderRightMenuGroup>
      </HeaderInnerBox>
    </HeaderContainer>
  );
};

export default HeaderNB;
