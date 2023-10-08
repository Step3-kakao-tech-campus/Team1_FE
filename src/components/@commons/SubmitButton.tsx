import React from 'react';
import styled from 'styled-components';

const SubmitButton = styled.button<{
  $activeColor?: string;
  $disabledColor?: string;
  $disabled?: boolean;
  $width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.$width ? props.$width : '100%')};
  padding: 12px 28px;

  border-radius: 8px;
  background: ${(props) =>
    props.$disabled
      ? props.$disabledColor
        ? props.$disabledColor
        : props.theme.color.gray
      : props.$activeColor
      ? props.$activeColor
      : props.theme.color.yellow};

  font-weight: ${({ theme }) => theme.fonts.fontWeight.medium};
  font-size: ${({ theme }) => theme.fonts.fontSize.base};
`;

export default SubmitButton;
