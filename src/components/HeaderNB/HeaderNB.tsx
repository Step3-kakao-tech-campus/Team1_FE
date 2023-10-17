import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderInnerBox,
  HeaderButton,
  HeaderLeftMenuGroup,
  HeaderRightMenuGroup,
} from 'components/HeaderNB/HeaderNBStyels';
import useLogin from 'hooks/useLogin';
import { Alarm, Hamburger } from './icons';
import Sidebar from 'components/@commons/sidebar/Sidebar';
import { SidebarBackground, SidebarBox } from 'components/@commons/sidebar';

const HeaderNB = (): JSX.Element => {
  
  const loginState = useLogin().getLoginState();
  const { logout } = useLogin('/');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sidebarHandler = () => {
    setIsOpen(() => !isOpen);
  };

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
          {loginState.isLogin && <HeaderButton onClick={logout}>임시로그아웃</HeaderButton>}
        </HeaderRightMenuGroup>
      </HeaderInnerBox>
    </HeaderContainer>
  );
};

export default HeaderNB;
