import React from 'react';
import styled from 'styled-components';
import HeaderNB from 'components/HeaderNB/HeaderNB';
import BottomNB from 'components/BottomNB/BottomNB';

interface Props {
  children: React.ReactNode;
  gap?: string;
  padding?: string;
  justify?: string;
  withoutHeader?: boolean;
  withoutBottonBar?: boolean;
}

const PageContainer = ({ children, gap, padding, withoutHeader, withoutBottonBar, justify }: Props): JSX.Element => {
  return (
    <WholeConatiner>
      <ColumnContainer>
        {!withoutHeader && <HeaderNB />}
        <MainContainer $gap={gap} $padding={padding} $justify={justify} $bottom={!withoutBottonBar}>
          {children}
        </MainContainer>
        {!withoutBottonBar && <BottomNB />}
      </ColumnContainer>
    </WholeConatiner>
  );
};

export default PageContainer;

const WholeConatiner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColumnContainer = styled.div`
  /* position: absolute;
  left: 50%;
  transform: translateX('-50%'); */
  position: relative;

  width: 100%;
  height: 100%;

  max-width: 585px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

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
