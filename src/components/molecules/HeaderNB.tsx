import React from 'react';
import {
  HeaderNBContainer,
  HeaderNBInnerBox,
  HeaderNBButton,
  HeaderNBLeftMenuGroup,
  HeaderNBRightMenuGroup,
  Logobox,
} from 'components/atoms/HeaderNB';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'states/store';
import useLogin from 'hooks/useLogin';
import tokenValidator from 'utils/tokenValidator';

const HeaderNB = (): JSX.Element => {
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.login);
  const { logout } = useLogin();
  if (loginState.islogin && !tokenValidator(loginState.token)) {
    logout();
  }

  return (
    <HeaderNBContainer>
      <HeaderNBInnerBox>
        <HeaderNBLeftMenuGroup>
          <Link to="/">
            <Logobox />
          </Link>
        </HeaderNBLeftMenuGroup>

        <HeaderNBRightMenuGroup className="ml-auto">
          {loginState.islogin ? (
            <>
              <span>{loginState.userData.userName} 님</span>
              <HeaderNBButton onClick={logout}>로그아웃</HeaderNBButton>
            </>
          ) : (
            <HeaderNBButton
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </HeaderNBButton>
          )}
        </HeaderNBRightMenuGroup>
      </HeaderNBInnerBox>
    </HeaderNBContainer>
  );
};

export default HeaderNB;
