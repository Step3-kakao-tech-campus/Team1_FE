import React from 'react';
import styled from 'styled-components';

interface Props {
  width?: string;
  gradation?: boolean;
  border?: boolean;
  borderColor?: string;
  children: React.ReactNode;
}

const BorderBox = ({ width, gradation, border, borderColor, children }: Props): JSX.Element => {
  return (
    <StyledBorderBox $width={width} $gradation={gradation} $border={border} $borderColor={borderColor}>
      {children}
    </StyledBorderBox>
  );
};

interface StyledProps {
  $width?: string;
  $gradation?: boolean;
  $border?: boolean;
  $borderColor?: string;
}

const StyledBorderBox = styled.div<StyledProps>`
  background: ${({ theme }) => theme.color.backgroundColor};
  border: ${(props) => (props.$border ? '1px solid' : 'none')};
  border-color: ${(props) => (props.$borderColor ? props.$borderColor : props.theme.color.textColor)};
  box-shadow: ${(props) => (props.$gradation ? '0px 1px 5px rgba(0, 0, 0, 0.25)' : 'none')};
  width: ${(props) => (props.$width ? props.$width : '')};
`;

export default BorderBox;
