import React from 'react';
import styled from 'styled-components';
import HeaderNB from 'components/HeaderNB/HeaderNB';
import { AlbaBottomNB, AdminBottomNB } from 'components/BottomNB/BottomNB';
import { getLoginData } from 'utils/loginDatahandlers';

interface Props {
  children: React.ReactNode;
  gap?: string;
  padding?: string;
  justify?: string;
  withoutHeader?: boolean;
  withoutBottonBar?: boolean;
}

const PageContainer = ({ children, gap, padding, withoutHeader, withoutBottonBar, justify }: Props): JSX.Element => {
  const isAdmin = getLoginData().isAdmin;

  return (
    <>
      {!withoutHeader && <HeaderNB />}
      <MainContainer $gap={gap} $padding={padding} $justify={justify} $bottom={!withoutBottonBar}>
        {children}
      </MainContainer>
      {!withoutBottonBar && isAdmin && <AdminBottomNB />}
      {!withoutBottonBar && !isAdmin && <AlbaBottomNB />}
    </>
  );
};

export default PageContainer;

const MainContainer = styled.main<{
  $gap?: string;
  $padding?: string;
  $justify?: string;
  $bottom?: boolean;
}>`
  flex-grow: 1;
  position: relative;

  gap: ${(props) => (props.$gap ? props.$gap : '20px')};
  padding: ${(props) => (props.$padding ? props.$padding : '28px')};

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$justify ? props.$justify : 'center')};
  align-items: center;

  padding-bottom: ${(props) => (props.$bottom ? '80px' : '')};
`;
