import React from 'react';
import styled from 'styled-components';

const SubmitButton = styled.button<{
  $activeColor?: string;
  $disabledColor?: string;
  $disabled?: boolean;
  $width?: string;
  $margin?: string;
  $padding?: string;
  $hasBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.$width ? props.$width : '100%')};

  padding: ${(props) => (props.$padding ? props.$padding : '12px 28px')};
  margin: ${(props) => (props.$margin ? props.$margin : '0')};

  border-radius: 8px;
  background: ${(props) =>
    props.$disabled
      ? props.$disabledColor
        ? props.$disabledColor
        : props.theme.color.gray
      : props.$activeColor
      ? props.$activeColor
      : props.theme.color.yellow};

  border: ${(props) => (props.$hasBorder ? '3px solid' : '')};
  border-color: ${(props) => (props.$hasBorder ? props.theme.color.yellow : '')};

  font-weight: ${({ theme }) => theme.fonts.fontWeight.medium};
  font-size: ${({ theme }) => theme.fonts.fontSize.base};
`;

export default SubmitButton;
