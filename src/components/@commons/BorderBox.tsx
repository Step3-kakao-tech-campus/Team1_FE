import React from 'react';
import styled from 'styled-components';

interface Props {
  width?: string;
  gradation?: boolean;
  border?: boolean;
  borderColor?: string;
}
const BorderBox = styled.div<Props>`
  background: ${({ theme }) => theme.color.backgroundColor};
  border: ${(props) => (props.border ? '1px solid' : '')};
  border-color: ${(props) => (props.borderColor ? props.borderColor : props.theme.color.textColor)}
  box-shadow: ${(props) => (props.gradation ? '0px 1px 5px rgba(0, 0, 0, 0.25)' : '')};
  width: ${(props) => (props.width ? props.width : '')};
`;

export default BorderBox;
