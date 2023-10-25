import React from 'react';
import DefferedSuspense from '../DefferedSuspense';
import FlexContainer from 'components/@commons/FlexContainer';
import BorderBox from 'components/@commons/BorderBox';
import Skeleton from '../Skeleton';

const TimeSelectSkeleton = () => {
  return (
    <DefferedSuspense>
      <FlexContainer $wFull>
        {[1, 2, 3].map((e) => (
          <BorderBox width="100%" gradation={true} key={e}>
            <FlexContainer $wFull $padding="28px" $direction="row" $align="center">
              <Skeleton height="1.5rem" />
            </FlexContainer>
          </BorderBox>
        ))}
      </FlexContainer>
    </DefferedSuspense>
  );
};

export default TimeSelectSkeleton;
