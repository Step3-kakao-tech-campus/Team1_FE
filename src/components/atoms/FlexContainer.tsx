import React from 'react';
import styled from 'styled-components';

interface Props {
  children: any;
  gap?: string;
  padding?: string;
  direction?: string;
  wFull?: boolean;
  hFull?: boolean;
  justify?: string;
  align?: string;
}

const FlexContainer = ({ children, gap, padding, direction, wFull, hFull, justify, align }: Props): JSX.Element => {
  return (
    <Container
      gap={gap}
      padding={padding}
      direction={direction}
      wFull={wFull}
      hFull={hFull}
      justify={justify}
      align={align}
    >
      {children}
    </Container>
  );
};

export default FlexContainer;

const Container = styled.div<{
  gap?: string;
  padding?: string;
  direction?: string;
  wFull?: boolean;
  hFull?: boolean;
  justify?: string;
  align?: string;
}>`
  width: ${(props) => (props.wFull ? '100%' : '')};
  height: ${(props) => (props.hFull ? '100%' : '')};

  gap: ${(props) => (props.gap ? props.gap : '20px')};
  padding: ${(props) => (props.padding ? props.padding : '0')};

  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'column')};

  justify-content: ${(props) => (props.justify ? props.justify : 'center')};
  align-items: ${(props) => (props.align ? props.align : 'stretch')};
`;
