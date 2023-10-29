import React from 'react';
import styled from 'styled-components';
import { myTheme } from 'styles/myTheme';

interface Props {
  size?: string;
  color?: string;
  weight?: 'bold' | 'semiBold' | 'medium' | 'regular' | 'light';
  block?: boolean;
  align?: string;
  margin?: string;
  children: React.ReactNode;
}

const Text = ({ size, color, weight, block, align, margin, children }: Props): JSX.Element => {
  let fontSize = size || myTheme.fonts.fontSize.base;
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
    case 'xxl':
      fontSize = myTheme.fonts.fontSize.xxl;
      break;
    case 'xxxl':
      fontSize = myTheme.fonts.fontSize.xxxl;
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

  const fontColor = color || myTheme.color.textColor;

  return (
    <StyledSpan $size={fontSize} $color={fontColor} $weight={fontweight} $block={block} $align={align} $margin={margin}>
      {children}
    </StyledSpan>
  );
};

export default Text;

interface StyledProps {
  $size: string;
  $color: string;
  $weight: number;
  $block?: boolean;
  $align?: string;
  $margin?: string;
}
const StyledSpan = styled.span<StyledProps>`
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
  font-weight: ${(props) => props.$weight};
  display: ${(props) => (props.$block ? 'block' : null)};
  margin: ${(props) => (props.$margin ? props.$margin : '0 auto')};
  text-align: ${(props) => (props.$align ? props.$align : 'center')};
`;
