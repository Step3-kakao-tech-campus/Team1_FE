import { styled } from 'styled-components';
import React from 'react';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundColor};
`;

export const HeaderLeftMenuGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRightMenuGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
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
  margin: 0 10px;
`;
