import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';

import Text from 'components/@commons/Text';

const TotalWorkTime = ({ totalWorkTime }: { totalWorkTime: { weekly: number; monthly: number } }): JSX.Element => {
  return (
    <FlexContainer $direction="row">
      <FlexContainer $gap="0" $align="center">
        <Text size="xs">이번주</Text>
        <Text size="xs">근무시간</Text>
        <Text size="lg" weight="semiBold">
          {totalWorkTime.weekly}
        </Text>
      </FlexContainer>
      <FlexContainer $gap="0" $align="center">
        <Text size="xs">이번달</Text>
        <Text size="xs">근무시간</Text>
        <Text size="lg" weight="semiBold">
          {totalWorkTime.monthly}
        </Text>
      </FlexContainer>
    </FlexContainer>
  );
};

export default TotalWorkTime;
