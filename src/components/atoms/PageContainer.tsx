import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
}

const PageContainer = ({ children }: Props): JSX.Element => {
  return (
    <WholeConatiner>
      <StyledContainer>{children}</StyledContainer>
    </WholeConatiner>
  );
};

export default PageContainer;

const WholeConatiner = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor};
  width: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
