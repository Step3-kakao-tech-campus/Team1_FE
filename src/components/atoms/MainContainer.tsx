import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
  flexDirenction?: string;
}

const MainContainer = ({ children }: Props): JSX.Element => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default MainContainer;

const StyledContainer = styled.main<{
  flexDirenction?: string;
}>`
  background-color: ${({ theme }) => theme.color.backgroundColor};
  width: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: ${(props) => (props.flexDirenction ? props.flexDirenction : 'column')};
  align-items: center;
`;
