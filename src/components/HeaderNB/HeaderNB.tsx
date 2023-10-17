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
import Sidebar from 'components/Sidebar/Sidebar';
import { SidebarBackground, SidebarBox } from 'components/Sidebar';

const HeaderNB = (): JSX.Element => {
  /* ----------------------- ! 수정 중 입니다 ! ------------------------ */

  const loginState = useLogin().getLoginState();
  const { logout } = useLogin('/');

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <HeaderInnerBox>
          <HeaderLeftMenuGroup>
            <HeaderButton onClick={() => setIsOpen(true)}>
              <Hamburger />
            </HeaderButton>
          </HeaderLeftMenuGroup>

          <HeaderRightMenuGroup>
            <Alarm />
            {loginState.isLogin && <HeaderButton onClick={logout}>임시로그아웃</HeaderButton>}
          </HeaderRightMenuGroup>
        </HeaderInnerBox>
      </HeaderContainer>

      {isOpen && (
        <SidebarBackground onClick={() => setIsOpen(false)}>
          <SidebarBox onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </SidebarBox>
        </SidebarBackground>
      )}
    </>
  );
};

export default HeaderNB;
