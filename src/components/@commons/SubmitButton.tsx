import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  id?: string;
  activeColor?: string;
  disabledColor?: string;
  fontWeight?: number;
  fontSize?: string;
  width?: string;
}

const SubmitButton = ({
  children,
  disabled,
  onClick,
  className,
  id,
  activeColor,
  disabledColor,
  width,
}: Props): JSX.Element => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      className={className}
      id={id}
      activeColor={activeColor}
      disabledColor={disabledColor}
      width={width}
    >
      <span>{children}</span>
    </StyledButton>
  );
};

export default SubmitButton;

const StyledButton = styled.button<{
  activeColor?: string;
  disabledColor?: string;
  disabled?: boolean;
  width?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.width ? props.width : '100%')};
  padding: 12px 28px;

  border-radius: 8px;
  background: ${(props) =>
    props.disabled
      ? props.disabledColor
        ? props.disabledColor
        : props.theme.color.gray
      : props.activeColor
      ? props.activeColor
      : props.theme.color.yellow};

  font-weight: ${({ theme }) => theme.fonts.fontWeight.medium};
  font-size: ${({ theme }) => theme.fonts.fontSize.base};
`;
