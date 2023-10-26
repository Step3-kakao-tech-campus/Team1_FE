import React from 'react';
import FlexContainer from './FlexContainer';
import ColorBox from './ColorBox';
import { myTheme } from 'styles/myTheme';

interface Props {
  children: React.ReactNode;
}

const GrayBox = ({ children }: Props): JSX.Element => {
  return (
    <FlexContainer $wFull $align="center">
      <ColorBox $wFull $padding="50px 40px" $background={myTheme.color.lightGray}>
        {children}
      </ColorBox>
    </FlexContainer>
  );
};

export default GrayBox;
