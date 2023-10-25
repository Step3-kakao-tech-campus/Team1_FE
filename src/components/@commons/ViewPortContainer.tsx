import React from 'react';
import styled from 'styled-components';

const ViewPortContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <WholeConatiner>
      <ColumnContainer>{children}</ColumnContainer>
    </WholeConatiner>
  );
};

export default ViewPortContainer;

const WholeConatiner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColumnContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  max-width: 585px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;
