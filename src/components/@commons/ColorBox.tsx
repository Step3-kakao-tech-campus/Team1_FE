import React from 'react';
import styled from 'styled-components';

interface Props {
  $wFull?: boolean;
  $hFull?: boolean;
  $background?: string;
}

const ColorBox = styled.div<Props>`
  width: ${(props) => (props.$wFull ? '100%' : '')};
  height: ${(props) => (props.$hFull ? '100%' : '')};

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: stretch;
  background: ${(props) => (props.$background ? props.$background : 'none')};
`;

export default ColorBox;
