import React from 'react';
import styled from 'styled-components';
import { myTheme } from 'styles/myTheme';

interface Props {
  size?: string;
  color?: string;
  weight?: 'bold' | 'semiBold' | 'medium' | 'regular' | 'light';
  block?: boolean;
  children: string | string[];
}

const Text = ({ size, color, weight, block, children }: Props): JSX.Element => {
  let fontSize = size === undefined ? 'base' : size;
  switch (size) {
    case 'sm':
      fontSize = myTheme.fonts.fontSize.sm;
      break;
    case 'xs':
      fontSize = myTheme.fonts.fontSize.xs;
      break;
    case 'base':
      fontSize = myTheme.fonts.fontSize.base;
      break;
    case 'lg':
      fontSize = myTheme.fonts.fontSize.lg;
      break;
    case 'xl':
      fontSize = myTheme.fonts.fontSize.xl;
      break;
  }

  let fontweight = 400;

  switch (weight) {
    case 'bold':
      fontweight = myTheme.fonts.fontWeight.bold;
      break;
    case 'semiBold':
      fontweight = myTheme.fonts.fontWeight.semiBold;
      break;
    case 'medium':
      fontweight = myTheme.fonts.fontWeight.medium;
      break;
    case 'regular':
      fontweight = myTheme.fonts.fontWeight.regular;
      break;
    case 'light':
      fontweight = myTheme.fonts.fontWeight.light;
      break;
  }

  let fontColor = color === undefined ? myTheme.color.textColor : color;

  return (
    <StyledSpan $size={fontSize} $color={fontColor} $weight={fontweight} $block={block}>
      {children}
    </StyledSpan>
  );
};

export default Text;

const StyledSpan = styled.span<{ $size: string; $color: string; $weight: number; $block?: boolean }>`
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
  font-weight: ${(props) => props.$weight};
  display: ${(props) => (props.$block ? 'block' : null)};
`;
