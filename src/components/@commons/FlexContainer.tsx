import React from 'react';
import styled from 'styled-components';

interface Props {
  $gap?: string;
  $padding?: string;
  $direction?: string;
  $wFull?: boolean;
  $hFull?: boolean;
  $justify?: string;
  $align?: string;
  $backgroundColor?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const FlexContainer = styled.div<Props>`
  width: ${(props) => (props.$wFull ? '100%' : '')};
  height: ${(props) => (props.$hFull ? '100%' : '')};

  gap: ${(props) => (props.$gap ? props.$gap : '20px')};
  padding: ${(props) => (props.$padding ? props.$padding : '0')};

  display: flex;
  flex-direction: ${(props) => (props.$direction ? props.$direction : 'column')};

  justify-content: ${(props) => (props.$justify ? props.$justify : 'center')};
  align-items: ${(props) => (props.$align ? props.$align : 'stretch')};

  background-color: ${(props) => props.$backgroundColor};
`;

export default FlexContainer;
