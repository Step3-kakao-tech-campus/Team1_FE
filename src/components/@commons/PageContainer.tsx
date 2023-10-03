import React from 'react';
import styled from 'styled-components';
import HeaderNB from 'components/HeaderNB/HeaderNB';

interface Props {
  children?: any;
  gap?: string;
  padding?: string;
  withoutHeader?: boolean;
  withoutBottonBar?: boolean;
}

const PageContainer = ({ children, gap, padding, withoutHeader, withoutBottonBar }: Props): JSX.Element => {
  return (
    <WholeConatiner>
      <ColumnContainer>
        {!withoutHeader && <HeaderNB />}
        <MainContainer $gap={gap} $padding={padding}>
          {children}
        </MainContainer>
        {!withoutBottonBar && <HeaderNB />}
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
  left: 50%;
  transform: translateX('100%');

  width: 100%;
  height: 100%;

  max-width: 585px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MainContainer = styled.main<{
  $gap?: string;
  $padding?: string;
}>`
  flex-grow: 1;

  gap: ${(props) => (props.$gap ? props.$gap : '20px')};
  padding: ${(props) => (props.$padding ? props.$padding : '28px')};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
