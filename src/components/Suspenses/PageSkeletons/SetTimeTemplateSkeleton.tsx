import ColorBox from 'components/@commons/ColorBox';
import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';
import { myTheme } from 'styles/myTheme';
import Skeleton from '../Skeleton';
import DefferedSuspense from '../DefferedSuspense';

const SetTimeTemplateSkeleton = () => {
  return (
    <DefferedSuspense>
      {[1, 2, 3].map((e) => (
        <ColorBox $wFull $background={myTheme.color.lightYellow} key={e}>
          <FlexContainer $wFull $padding="20px">
            <FlexContainer $position="relative" $direction="row" $wFull>
              <Skeleton width="10%" height="1.6rem" />
            </FlexContainer>

            <FlexContainer $direction="row">
              <Skeleton width="50%" height="1.3rem" />
            </FlexContainer>
          </FlexContainer>
        </ColorBox>
      ))}
    </DefferedSuspense>
  );
};

export default SetTimeTemplateSkeleton;
