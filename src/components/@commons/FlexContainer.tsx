import React from 'react';
import styled from 'styled-components';

interface Props {
  $gap?: string;
  $padding?: string;
  $direction?: string;
  $wFull?: boolean;
  $hFull?: boolean;
  $width?: string;
  $height?: string;
  $justify?: string;
  $align?: string;
  $position?: string;
  $shrink?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const FlexContainer = styled.div<Props>`
  position: ${(props) => (props.$position ? props.$position : '')};
  width: ${(props) => (props.$wFull ? '100%' : props.$width ? props.$width : '')};
  height: ${(props) => (props.$hFull ? '100%' : props.$height ? props.$height : '')};

  gap: ${(props) => (props.$gap ? props.$gap : '20px')};
  padding: ${(props) => (props.$padding ? props.$padding : '0')};

  display: flex;
  flex-direction: ${(props) => (props.$direction ? props.$direction : 'column')};

  justify-content: ${(props) => (props.$justify ? props.$justify : 'center')};
  align-items: ${(props) => (props.$align ? props.$align : 'stretch')};
  flex-shrink: ${(props) => (props.$shrink ? props.$shrink : '')};
`;

export default FlexContainer;
