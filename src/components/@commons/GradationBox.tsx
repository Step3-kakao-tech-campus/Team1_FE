import React from 'react';
import styled from 'styled-components';

interface Props {
  margin?: number;
  children?: any;
}

const GradationBox = styled.div<{ width?: string }>`
  background: ${({ theme }) => theme.color.backgroundColor};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  width: ${(props) => (props.width ? props.width : '')};
`;

export default GradationBox;
