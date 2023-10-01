import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
  fromTop?: boolean;
}

const MainContainer = ({ children, fromTop }: Props): JSX.Element => {
  return <StyledContainer fromTop={fromTop}>{children}</StyledContainer>;
};

export default MainContainer;

const StyledContainer = styled.main<{
  fromTop?: boolean;
}>`
  background-color: ${({ theme }) => theme.color.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.fromTop === true ? 'start' : 'center')};
  height: 100%;

  align-items: center;
  padding: 0 24px 0 24px;
`;
