import React from 'react';
import FlexContainer from './FlexContainer';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const GrayBox = ({ children }: Props): JSX.Element => {
  return <Container>{children}</Container>;
};

export default GrayBox;

const Container = styled(FlexContainer)`
  width: auto;
  padding: 50px 40px;
  background-color: ${({ theme }) => theme.color.lightGray};
  align-items: center;
`;
