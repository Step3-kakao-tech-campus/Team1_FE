import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  left: 0%;
  height: 60px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundColor};
  z-index: 90;
`;

export const HeaderLeftMenuGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRightMenuGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderInnerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 7px;
`;

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const HeaderTitleCont = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;
