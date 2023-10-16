import React from 'react';
import {
  HeaderContainer,
  HeaderInnerBox,
  HeaderButton,
  HeaderLeftMenuGroup,
  HeaderRightMenuGroup,
} from 'components/HeaderNB/HeaderNBStyels';
import useLogin from 'hooks/useLogin';
import { Alarm, Hamburger } from './icons';

const HeaderNB = (): JSX.Element => {
  const loginState = useLogin().getLoginState();
  const { logout } = useLogin('/');

  return (
    <HeaderContainer>
      <HeaderInnerBox>
        <HeaderLeftMenuGroup>
          <button>
            <Hamburger />
          </button>
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
