import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
  isFromTop?: boolean;
  isHeader?: boolean;
  isBottonBar?: boolean;
  gap?: string;
}

const MainContainer = ({ children, isFromTop, isHeader, isBottonBar, gap }: Props): JSX.Element => {
  return (
    <StyledContainer isFromTop={isFromTop} isHeader={isHeader} isBottonBar={isBottonBar} gap={gap}>
      {children}
    </StyledContainer>
  );
};

export default MainContainer;

const StyledContainer = styled.main<{
  isFromTop?: boolean;
  isHeader?: boolean;
  isBottonBar?: boolean;
  gap?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  gap: ${(props) => (props.gap ? props.gap : '20px')};
  padding: 24px;
`;
