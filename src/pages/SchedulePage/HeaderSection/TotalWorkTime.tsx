import FlexContainer from 'components/@commons/FlexContainer';
import React from 'react';

import Text from 'components/@commons/Text';
import { useAtomValue } from 'jotai';
import { workTimeAtom } from '../states';

const TotalWorkTime = (): JSX.Element => {
  const totalWorkTime = useAtomValue(workTimeAtom);
  return (
    <FlexContainer $direction="row">
      <FlexContainer $gap="0" $width="max-content">
        <Text size="xxs">이번주</Text>
        <Text size="xxs">근무시간</Text>
        <Text size="base" weight="semiBold">
          {totalWorkTime.weekly}
        </Text>
      </FlexContainer>
      <FlexContainer $gap="0" $width="max-content">
        <Text size="xxs">이번달</Text>
        <Text size="xxs">근무시간</Text>
        <Text size="base" weight="semiBold">
          {totalWorkTime.monthly}
        </Text>
      </FlexContainer>
    </FlexContainer>
  );
};

export default TotalWorkTime;
